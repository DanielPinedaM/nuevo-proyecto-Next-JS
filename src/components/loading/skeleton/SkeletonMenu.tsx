import { isNumber } from '@/utils/func/dataType';

interface ISkeletonMenu {
  length?: number;
}

export default function SkeletonMenu({ length }: ISkeletonMenu) {
  const skeletonLength: number = length && isNumber(length) && length >= 1 ? Number(length) : 4;
  const items: unknown[] = Array.from({ length: skeletonLength });

  return (
    <ul className='flex flex-col gap-y-1'>
      {items.map((_, i: number) => (
        <li key={i}>
          <div className='animate-pulse h-1 bg-gray-400 rounded w-10/12' />
        </li>
      ))}
    </ul>
  );
}
