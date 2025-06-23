import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const amountTotal = session.amount_total;

    if (amountTotal === null) {
        console.error('Amount was null in webhook. Cannot create subscription.');
        return NextResponse.json({ error: 'Webhook Error: Amount was null' }, { status: 400 });
    }

    try {
      console.log('Creating subscription in db');

      const newSubscription = await prisma.subscription.create({
        data: {
          amount: amountTotal,
        },
      });

      console.log(`Database updated successfully. Subscription ID: ${newSubscription.id}`);

    } catch (dbError) {
      console.error('Database update failed:', dbError);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}