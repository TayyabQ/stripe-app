// app/api/checkout_sessions/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Incoming Request Body:', body);

    const { amount } = body;
    if (!amount) throw new Error('Amount not provided');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Custom Product',
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    console.log('Stripe session created:', session.id);
    return NextResponse.json(session);
  } catch (err: any) {
    console.error('Stripe API error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
