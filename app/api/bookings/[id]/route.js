import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    const booking = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking status' }, { status: 500 });
  }
}
