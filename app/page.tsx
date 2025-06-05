'use client';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

async function fetchPostJSON(url: string, data: any) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Network error');
  }
}

export default function Page() {
  const handleSubmit = async (amountInCents: number) => {
    try {
      const checkoutSession = await fetchPostJSON(
        '/api/checkout_sessions',
        { amount: amountInCents }
      );

      if ((checkoutSession as any).statusCode === 500) {
        console.error((checkoutSession as any).error);
        return;
      }

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (error) console.warn(error.message);
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 mx-4 my-10 min-lg:flex-row">
      <div className="flex w-4/5 h-1/5 flex-col justify-center items-start p-4 bg-gradient-to-br from-blue-400 to-blue-800 gap-8">
        <h1 className="text-4xl font-bold mb-8">BEGINNER</h1>
        <p className="text-2xl">Domain Only</p>
        <button
          className="bg-black text-white px-4 py-2 rounded-sm mt-4"
          onClick={() => handleSubmit(10000)} // $100
        >
          $100
        </button>
      </div>

      <div className="flex w-4/5 flex-col justify-center items-start p-4 bg-gradient-to-br from-green-400 to-green-800 gap-8">
        <h1 className="text-4xl font-bold mb-8">INTERMEDIATE</h1>
        <p className="text-2xl">Domain</p>
        <p className="text-2xl">Hosting</p>
        <button
          className="bg-black text-white px-4 py-2 rounded-sm mt-4"
          onClick={() => handleSubmit(20000)} // $200
        >
          $200
        </button>
      </div>

      <div className="flex w-4/5 flex-col justify-center items-start p-4 bg-gradient-to-br from-red-400 to-red-800 gap-8">
        <h1 className="text-4xl font-bold mb-8">PROFESSIONAL</h1>
        <p className="text-2xl">Domain</p>
        <p className="text-2xl">Hosting</p>
        <p className="text-2xl">A Virtual Machine</p>
        <p className="text-2xl">Multiple Roles</p>
        <button
          className="bg-black text-white px-4 py-2 rounded-sm mt-4"
          onClick={() => handleSubmit(50000)} // $500
        >
          $500
        </button>
      </div>
    </div>
  );
}
