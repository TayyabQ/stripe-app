import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount } = body;
    if (!amount) {
      throw new Error('Amount is required');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Subscription',
            },
            unit_amount: amount,
          },
          quantity: 5,
        },
      ],
      mode: 'payment',
      metadata: {
       
      },
      success_url: `${process.env.SITE_URL}/success?payment=success`,
      cancel_url: `${process.env.SITE_URL}/cancel?=payment=cancel`
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error('Stripe API error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
