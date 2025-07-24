import { isNumber } from '@/utils/func/dataType.utils';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ISkeletonText {
  length?: number;
}

export default function SkeletonText({ length }: ISkeletonText) {
  const skeletonLength: number = isNumber(length) ? Number(length) : 6;
  const items: unknown[] = Array.from({ length: skeletonLength });

  const widthsArray: string[] = ['w-19/20', 'w-2/3', 'w-1/3'];
  const widthsLength: number = widthsArray.length;

  return (
    <div className='flex flex-col gap-y-1 cursor-wait'>
      {items.map((_, i: number) => (
        <div
          key={i}
          className={twMerge(
            clsx({
              'mb-2.5': (i + 1) % widthsLength === 0 && i !== skeletonLength - 1,
            }),
            widthsArray[i % widthsLength],
            'bg-white/50 animate-pulse rounded-md h-2'
          )}
        />
      ))}
    </div>
  );
}
