import FormLogin from '@/app/(auth)/iniciar-sesion/formLogin';
import { IoArrowForward } from 'react-icons/io5';

export default function Page() {
  return (
    <section className='m-2'>
      <button className='btn btn-primary btn-background'>
        <span>Primary</span>
      </button>

      <button className='btn btn-secondary btn-background'>
        <span aria-hidden='true'>
          <IoArrowForward />
        </span>
        <span>Secondary</span>
      </button>

      {/* <section className='w-full h-screen bg-no-repeat bg-fixed bg-origin-border bg-bottom'>
      <div className='flex justify-center'>
        <div
          style={{
            boxShadow:
              'oklch(37.72% 0.030 281.56 / 0.25) 0px 2px 5px -1px,'
          }}
          className='flex flex-col items-center h-fit mx-2 basis-[460px] rounded-xl mt-3 xsm:mt-6 p-4'
        >
          <div className='xsm:w-[70%]'>
            <h1 className='text-dark-blue text-center text-[25px] font-medium mb-5'>
              <span className='block'>Bienvenido a </span>
              <span>tu plataforma web</span>
            </h1>

            <FormLogin />
          </div>
        </div>
      </div>
    </section> */}
    </section>
  );
}
