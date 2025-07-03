import { FaImage } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { isNumber, isString } from '@/utils/func/dataType';

interface ISkeletonCards {
  length?: number;
  gridCols?: string;
  showReactIcon?: boolean;
}

export default function SkeletonCards({ length, gridCols, showReactIcon = true }: ISkeletonCards) {
  const skeletonLength: number = isNumber(length) && length && length >= 1 ? Number(length) : 8;
  const items: unknown[] = Array.from({ length: skeletonLength });

  return (
    <section
      className={twMerge(
        clsx({
          [gridCols ?? '']: isString(gridCols) && gridCols?.includes('grid-cols-'),
          'grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4': !(
            gridCols && gridCols?.includes('grid-cols-')
          ),
        }),
        'grid gap-4 cursor-wait'
      )}
    >
      {items.map((_, id: number) => (
        <div
          key={id}
          className='flex flex-col gap-4 p-4 border border-gray-400 rounded-md bg-gray-300'
        >
          <div className='animate-pulse flex justify-center items-center w-full h-20 bg-gray-400 rounded'>
            {showReactIcon && <FaImage className='block w-full h-full' />}
          </div>

          <div className='animate-pulse w-3/4 h-4 bg-gray-400 rounded' />
          <div className='animate-pulse w-full h-4 bg-gray-500 rounded' />
        </div>
      ))}
    </section>
  );
}
