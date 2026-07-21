import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'No reference provided' }, { status: 400 });
  }

  try {
    // 1. Verify transaction with Paystack
    // const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    //   headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    // });
    // const data = await response.json();

    // 2. Update booking status
    // if (data.data.status === 'success') {
    //   await prisma.booking.update({
    //     where: { paystackRef: reference },
    //     data: { status: 'CONFIRMED' }
    //   });
    //   // Optionally send confirmation email here
    // }

    // return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.json({ success: true, message: "Mocked verify response" });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
