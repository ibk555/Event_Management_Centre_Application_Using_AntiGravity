'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.error("API Error:", data);
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const updateStatus = async (id, newStatus) => {
    const confirmMessage = newStatus === 'CANCELLED' 
      ? 'Are you sure you want to decline/cancel this booking?'
      : 'Are you sure you want to approve this booking?';
      
    if (window.confirm(confirmMessage)) {
      try {
        const res = await fetch(`/api/bookings/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        
        if (res.ok) {
          fetchBookings(); // Refresh list
        } else {
          alert('Failed to update status');
        }
      } catch (error) {
        alert('An error occurred');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <button className="btn" onClick={() => setIsAuthenticated(false)}>Logout</button>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {!(bookings || []).length ? (
          <p style={{ color: 'var(--disabled-text)', textAlign: 'center' }}>No bookings found.</p>
        ) : (
          (bookings || []).map(booking => (
            <div key={booking.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{booking.customerName} <span style={{ fontSize: '0.9rem', color: 'var(--disabled-text)', fontWeight: 'normal' }}>({booking.customerEmail})</span></h3>
                <p style={{ marginTop: '0.5rem' }}><strong>Date:</strong> {booking.date} | <strong>Time:</strong> {booking.timeSlot}</p>
                <span style={{ 
                  display: 'inline-block', 
                  marginTop: '0.5rem', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem',
                  backgroundColor: booking.status === 'CONFIRMED' ? '#d4edda' : booking.status === 'PENDING' ? '#fff3cd' : '#f8d7da',
                  color: booking.status === 'CONFIRMED' ? '#155724' : booking.status === 'PENDING' ? '#856404' : '#721c24'
                }}>
                  {booking.status}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {booking.status === 'PENDING' && (
                  <button className="btn" style={{ background: '#28a745' }} onClick={() => updateStatus(booking.id, 'CONFIRMED')}>
                    Approve
                  </button>
                )}
                {booking.status !== 'CANCELLED' && (
                  <button className="btn" style={{ background: '#dc3545' }} onClick={() => updateStatus(booking.id, 'CANCELLED')}>
                    Decline / Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
