'use client';
import { usePathname, useRouter } from 'next/navigation';
import { constPath } from './types/constant/const-path';

export default function NotFound() {
  const pathname: string = usePathname();
  const router = useRouter();

  const onClickReturnToPreviousPage = (): void => {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push("/" + constPath.login);
    }
  };

  return (
    <section className='flex items-center content-center min-h-screen w-full bg-ed-gray text-center'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md'>
          <h2 className='font-extrabold text-4xl sm:text-7xl dark:text-gray-600'>Error</h2>
          <h3 className='font-medium mb-5 text-3xl dark:text-gray-600'>404</h3>

          <p className='text-xl sm:text-2xl font-medium md:text-3xl'>Lo sentimos, no pudimos encontrar esta página.</p>
          <p className='italic text-[#6ba1ff] font-medium'>{pathname}</p>
          <p className='mt-4 mb-8 dark:text-gray-400'>Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra página</p>

          <button onClick={() => onClickReturnToPreviousPage()} className='font-medium cursor-pointer rounded-3xl shadow-md shadow-[#B7B7B7] py-1.5 px-5 bg-golden hover:opacity-90 hover:relative hover:bottom-px'>
            Volver
          </button>
        </div>
      </div>
    </section>
  );
}
