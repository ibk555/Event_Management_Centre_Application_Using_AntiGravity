import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
  try {
    const whereClause = date ? { date, status: { not: 'CANCELLED' } } : {};
    // Admin dashboard fetches all when date is not provided
    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch bookings', 
        details: error.message,
        hint: 'Ensure DATABASE_URL is set in Vercel Environment Variables.'
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, email, date, timeSlot } = await request.json();
    
    // 1. Check if slot is available (not confirmed or pending by someone else)
    const existing = await prisma.booking.findFirst({
      where: { date, timeSlot, status: { not: 'CANCELLED' } }
    });
    if (existing) return NextResponse.json({ error: 'Slot already booked' }, { status: 400 });

    // 2. Save pending booking
    const booking = await prisma.booking.create({
      data: {
        customerName: name,
        customerEmail: email,
        date,
        timeSlot,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initiate booking' }, { status: 500 });
  }
}
