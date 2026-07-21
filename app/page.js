'use client';

import { useState, useEffect } from 'react';

const HOURS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00"
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/bookings?date=${selectedDate}`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedDate]);

  const handleSlotClick = (hour) => {
    const isBooked = bookings.some(b => b.timeSlot === hour && b.status !== 'CANCELLED');
    if (!isBooked) {
      setSelectedSlot(hour);
      setIsModalOpen(true);
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          timeSlot: selectedSlot
        }) 
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage(`Success! Your booking for ${selectedSlot} on ${selectedDate} has been sent for approval.`);
        fetchBookings(); // Refresh slots
        setTimeout(() => setIsModalOpen(false), 3000);
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to submit booking.");
    } finally {
      setIsLoading(false);
      setFormData({ name: '', email: '' });
    }
  };

  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Event Center Booking</h1>
        <p style={{ color: 'var(--disabled-text)' }}>Select an available time slot to secure your booking.</p>
      </header>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label htmlFor="date" style={{ fontWeight: 500 }}>Select Date:</label>
        <input 
          type="date" 
          id="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="slots-grid">
        {HOURS.map(hour => {
          const isBooked = bookings.some(b => b.timeSlot === hour && b.status !== 'CANCELLED');
          return (
            <div 
              key={hour}
              onClick={() => handleSlotClick(hour)}
              className={`card slot-card ${isBooked ? 'booked' : 'available'} ${selectedSlot === hour ? 'selected' : ''}`}
            >
              <div className="slot-time">{hour}</div>
              <div className="slot-status">{isBooked ? 'Booked / Pending' : 'Available'}</div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="card modal-content">
            <h2>Book {selectedSlot}</h2>
            
            {successMessage ? (
              <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '8px', marginTop: '1rem' }}>
                {successMessage}
              </div>
            ) : (
              <>
                <p style={{ marginBottom: '1rem', color: 'var(--disabled-text)' }}>Complete the form to request a booking. Admin will review and approve it.</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="button" className="btn" style={{ background: 'var(--disabled-bg)', color: 'var(--text-color)' }} onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn" disabled={isLoading} style={{ flex: 1 }}>
                      {isLoading ? 'Processing...' : 'Submit Booking'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
