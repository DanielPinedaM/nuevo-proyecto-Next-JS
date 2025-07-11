import { isNumber } from '@/utils/func/dataType';

interface ISkeletonMenu {
  length?: number;
}

export default function SkeletonMenu({ length }: ISkeletonMenu) {
  const skeletonLength: number = length && isNumber(length) && length >= 1 ? Number(length) : 15;
  const items: unknown[] = Array.from({ length: skeletonLength });

  return (
    <ul className='rounded-md py-4 px-2 bg-gray-200 w-25 flex-none flex flex-col justify-between gap-y-4 h-full'>
      {items.map((_, i: number) => (
        <li key={i}>
          <div className='animate-pulse bg-gray-400 rounded h-2' />
        </li>
      ))}
    </ul>
  );
}
