export default function CancelPage() {
  return (
    <div className="min-h-screen p-10 text-center flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="mt-4">You can try again anytime.</p>
      <a className='shadow-md rounded-md font-semibold px-4 py-2 mt-20 bg-white text-black hover:bg-black hover:text-white' href='/dashboard'>Buy Another Subscription</a>
    </div>
  );
}
