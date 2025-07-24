import { Suspense } from 'react';
import FetchData from './fetch/fetchData';
import SkeletonCards from '@/components/loading/skeleton/skeletonCards';
import SkeletonTable from '@/components/loading/skeleton/skeletonTable';

/* Page() crea la ruta  http://localhost:3000/fetch-ssr */
export default function Page() {
  return (
    <>
    
      <SkeletonTable/>
      <h1>
        <a
          href='https://www.youtube.com/watch?v=_SPoSMmN3ZU&t=3701s'
          target='_blank'
          className='text-nowrap'
        >
          Ejemplo: la data se carga en componente servidor con fetch SSR y hay un componente cliente
          q tiene un alert
        </a>
      </h1>

      {/*  <FetchData /> es componente servidor */}
      <Suspense fallback={<SkeletonCards />}>
        <FetchData />
      </Suspense>

    </>
  );
}
