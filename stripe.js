import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);