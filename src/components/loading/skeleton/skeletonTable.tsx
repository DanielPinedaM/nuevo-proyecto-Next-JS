import { isNumber } from '@/utils/func/dataType';

interface ISkeletonTable {
  length?: number; // número de filas, incluyendo encabezado <th>
}

export default function SkeletonTable({ length }: ISkeletonTable) {
  const skeletonLength: number = isNumber(length) && length && length >= 1 ? Number(length) : 6;
  const items: unknown[] = Array.from({ length: skeletonLength });

  return (
    <section className='cursor-wait p-4 border border-gray-300 rounded-xl flex flex-col gap-4 bg-gray-100'>
      {/* encabezado <th> */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-700 rounded-lg p-2 shadow-sm'>
        {Array.from({ length: 4 }).map((_, id) => (
          <div
            key={`header-${id}`}
            className='animate-pulse flex flex-col justify-center gap-y-1 w-full rounded-md border p-1 border-gray-400'
          >
            <div className='h-1 bg-gray-400 rounded w-10/12' />
            <div className='h-1 bg-gray-400 rounded w-7/12' />
            <div className='h-1 bg-gray-400 rounded w-3/12' />
          </div>
        ))}
      </div>

      {/* Filas de datos: iterar desde el segundo elemento en adelante */}
      {items.slice(1).map((_, rowId: number) => (
        <div
          key={`row-${rowId + 1}`}
          className='animate-pulse grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-200 rounded-md p-3 shadow'
        >
          {Array.from({ length: 4 }).map((_, colId: number) => (
            <div key={`cell-${rowId + 1}-${colId}`} className='flex items-center w-full'>
              <div className='h-1 bg-gray-400 rounded w-full' />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
