'use client';

import { loadStripe } from '@stripe/stripe-js';
import { FaCheck } from 'react-icons/fa';
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
    <div className='py-20 px-10 flex flex-col items-center justify-center'>
      <div className='py-8'>
        <h1 className='text-[48px] font-bold pb-10 lg:pb-0'>Pay only for what you use</h1>
        <p className='text-[20px] text-gray-500'>Transparent, usage-based pricing that scales with your business.</p>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center lg:gap-8 gap-16 px-4 py-8">
      <div className="h-full flex flex-col justify-center items-start p-12 gap-8 hover:border-1 hover:border-black rounded-xl shadow-sm">
        <div>
          <p className='text-[16px] font-semibold'>Starter</p>
          <p className='text-[36px] font-bold'>$0.00<span className='text-[14px] text-gray-500'>/yr</span></p>
        </div>
        <div className='h-full flex flex-col items-start justify-start gap-2'>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Up to 10,000 API calls/month</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Basic analytics</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Community support</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Standard rate limiting</p>
          </div>
        </div>
        <div className='w-full'>
          <button
            className="w-full bg-white text-black hover:bg-black hover:text-white text-[14px] font-medium rounded-md shadow-md mt-4 px-4 py-2"
          onClick={() => handleSubmit(10000)}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="h-full flex flex-col justify-center items-start p-12 gap-8 hover:border-1 hover:border-black rounded-xl shadow-sm">
        <div>
          <p className='text-[16px] font-semibold'>Growth</p>
          <p className='text-[36px] font-bold'>$470.40<span className='text-[14px] text-gray-500'>/yr</span></p>
          <p className='text-[12px] text-gray-500'>$470.4000000000001 base + usage</p>
        </div>
        <div className='h-full flex flex-col items-start justify-start gap-2'>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Up to 100,000 API calls/month</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Advanced analytics</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Priority support</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Higher rate limits</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Team access</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Custom domains</p>
          </div>
        </div>
        <div className='w-full'>
        <button
          className="w-full bg-white text-black hover:bg-black hover:text-white text-[14px] font-medium rounded-md shadow-md mt-4 px-4 py-2"
          onClick={() => handleSubmit(20000)}
        >
          Get Started
        </button>
        </div>
      </div>

      <div className="h-full flex flex-col justify-center items-start p-12 gap-8 hover:border-1 hover:border-black rounded-xl shadow-sm">
        <div>
          <p className='text-[16px] font-semibold'>Scale</p>
          <p className='text-[36px] font-bold'>$1910.40<span className='text-[14px] text-gray-500'>/yr</span></p>
          <p className='text-[12px] text-gray-500'>$1910.4000000000003 base + usage</p>
        </div>
        <div className='h-full flex flex-col items-start justify-start gap-2'>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Up to 1,000,000 API calls/month</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Enterprise analytics</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">24/7 support</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Highest rate limits</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Team access</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Custom domains</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">SLA guarantee</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4'/>
            <p className="text-[14px]">Dedicated account manager</p>
          </div>
        </div>
        <div className='w-full'>
        <button
          className="w-full bg-white text-black hover:bg-black hover:text-white text-[14px] font-medium rounded-md shadow-md mt-4 px-4 py-2"
          onClick={() => handleSubmit(50000)}
        >
          Get Started
        </button>
        </div>
      </div>
    </div>
    </div>
  );
}
