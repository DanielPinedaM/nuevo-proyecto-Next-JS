
import { Suspense } from 'react';
import ButtonsOpenDialogNombreTabla from '@/app/(features)/administrador/nombre-tabla/dialog/buttonsOpenDialogNombreTabla';
import GetTable from '@/app/(features)/administrador/nombre-tabla/table/getTable';
import InputSearchParams from '@/shared/components/InputSearchParams';
import IParams from '@/shared/data-types/interfaces/params.interfaces';
import SkeletonTable from '@/shared/components/loading/skeleton/skeletonTable';

export default async function Page({ searchParams }: IParams) {
  const { search } = await searchParams;

  return (
    <section>
      <div className='flex justify-between items-center mb-2'>
        <div>
          <h3 className='text-dark-pink mb-4'>Consulta de tablas</h3>

          <div className='flex gap-x-16'>
            <ButtonsOpenDialogNombreTabla />
          </div>
        </div>

        <InputSearchParams
          label={'Buscar'}
          placeholder={'Código, nombre...'}
          keySearchParams={'search'}
        />
      </div>

      <Suspense key={search?.toString()} fallback={<SkeletonTable />}>
        <GetTable search={search} />
      </Suspense>
    </section>
  );
}
