'use client';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { isString } from '@/shared/utils/func/dataType.utils';
import { isUseClient } from '@/shared/utils/func/general.utils';
import { IOptionsReactHotToast } from '@/shared/ui/overlay/toast/data-types/interfaces/toast.interface';

const IoIosWarning = dynamic(() => import('react-icons/io').then((mod) => mod.IoIosWarning));

export default function WarningToast(message: string, options?: IOptionsReactHotToast): void {
  if (!isUseClient()) {
    console.error(
      "❌ error - WarningToast - react-hot-toast se tiene q usar en componente cliente 'use client'",
    );
    return;
  }

  if (!isString(message)) {
    console.error('❌ error - WarningToast - react-hot-toast necesita el mensaje tipo string');
    return;
  }

  if (String(message).trim() === '') {
    console.error(
      "❌ error - WarningToast - react-hot-toast - el mensaje no puede ser un string vacio ''",
    );
    return;
  }

  const { duration = 3000, position = 'top-right' } = options ?? {};

  toast.custom(
    <section className='flex justify-center items-center gap-x-2 bg-yellow-500 p-4 rounded-xl'>
      <IoIosWarning className='text-white animate-icon-enter text-2xl' />
      <p>
        <span className='text-white'>Advertencia: </span>
        <span className='text-white'>
          {message.replaceAll('undefined', '').replaceAll('null', '').replaceAll('NaN', '')}
        </span>
      </p>
    </section>,
    {
      duration,
      position,
    },
  );
}
