import Dashboard from './dashboard/page';

export default function Page() {
  
  return (
     <div className='min-h-screen flex flex-col gap-8 items-center justify-center'>
        <h1 className='text-[24px] md:text-[32px] lg:text-[48px]'>Welcome to our Subscription App!</h1>
        <a className='shadow-md rounded-md font-semibold px-4 py-2 bg-white text-black hover:bg-black hover:text-white' href='/dashboard'>Buy Subscription</a>
     </div>
  );
}
