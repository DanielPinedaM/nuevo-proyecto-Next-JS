'use client';
import errorNotification from '@/components/dialog/notification/errorNotification';
import SkeletonMenu from '@/components/loading/skeleton/SkeletonMenu';
import CustomLink from '@/components/loading/spinner/navigation-spinner/CustomLinkInMenu';
import { listUrl } from '@/services/auth/auth';
import { useMenuStore } from '@/store/menuStore';
import { titleCase } from '@/utils/func/general';
import {
  sessionStorageDeleteSpecific,
  sessionStorageListValue,
  sessionStorageSaveAndUpdate,
  sessionStorageSearch,
} from '@/utils/func/sessionStorage';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IUrl {
  id: number;
  text: string;
  url: string;
}

export default function MenuResponsive() {
  const pathname = usePathname();

  const { showMenu } = useMenuStore();

  const [url, setUrl] = useState<IUrl[] | undefined>(undefined);

  useEffect(() => {
    if (sessionStorageSearch('menu')) {
      setUrl(sessionStorageListValue('menu'));
    } else {
      _listUrl();
    }
  }, []);

  const setMenuInStorage = (data: IUrl[]): void => {
    if (!data || data?.length === 0) {
      console.error('❌ error, el endpoint de listar opciones del menu no tiene datos data', data);
      errorNotification('Al mostrar el menu');
      sessionStorageDeleteSpecific('menu');
      setUrl([]);

      return;
    }

    sessionStorageSaveAndUpdate('menu', data);
    setUrl(data);
  };

  const _listUrl = async (): Promise<void> => {
    const { success, data } = await listUrl();

    if (success) {
      setMenuInStorage(data ?? []);
    } else {
      setUrl([]);
      console.error('❌ error en la llamada al endpoint q lista las opciones del menu');
      errorNotification('Al mostrar el menu');
    }
  };

  if (!showMenu) return null;

  const RenderMenu = () => (
    <menu className='h-full gap-y-1 flex flex-col'>
      {url?.map((item: IUrl) => (
        <li key={item.id} className='transition duration-300 hover:text-blue-ocean'>
          <CustomLink
            href={item.url}
            className={twMerge(
              clsx({
                'bg-amber-300 text-amber-800 font-semibold': pathname.includes(item.url),
              }),
              'border-2 border-blue-600 rounded-md'
            )}
          >
            {titleCase(item.text)}
          </CustomLink>
        </li>
      ))}
    </menu>
  );

  return (
    <>
      {url === undefined && <SkeletonMenu />}
      {url && url?.length > 0 && <RenderMenu />}
    </>
  );
}
