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

const apiResponse: IUrl[] = [
  {
    id: 1,
    url: '/inicio/administrador',
    text: 'Administrador',
  },
  {
    id: 2,
    url: '/inicio/usuario',
    text: 'Usuario',
  },
];

export default function MenuResponsive() {
  const pathname = usePathname();

  const { showMenu, hiddenMenu } = useMenuStore();

  const [url, setUrl] = useState<IUrl[] | undefined>(undefined);

  /*
  Para q menu funcione
  1) borrar el siguiente useEffect
  2) borrar la constante apiResponse
  3) descomentar el codigo q esta comentado
  4) cambiar el parametro URL de la funcion listUrl q esta en src/services/auth.ts por la URL q tiene en endpoint para listar menu
  5) la API tiene q responder asi 
  interface IResponse {
    success: boolean;
    status: number;
    message: string;
    data: IUrl[];
  } */
  useEffect(() => {
    setUrl(apiResponse);
  }, []);

  /* useEffect(() => {
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
  }; */

  const RenderMenu = () => (
    <>
      {url?.map((item: IUrl) => (
        <li key={item.id} className='transition duration-300 hover:text-blue-ocean'>
          <CustomLink
            href={item.url}
            onClick={hiddenMenu}
            className={twMerge(
              clsx({
                'bg-amber-300 text-amber-800 font-semibold': pathname.includes(item.url),
              }),
              'border-2 border-blue-600 rounded-md p-2'
            )}
          >
            {titleCase(item.text)}
          </CustomLink>
        </li>
      ))}
    </>
  );

  return (
    <>
      {showMenu && (
        <menu className='h-full gap-y-1 flex flex-col py-4 px-2 fixed left-0 top-0 xl:static bg-blue-600/50 rounded-tr-2xl rounded-tb-2xl'>
          {url === undefined && <SkeletonMenu />}
          {url && url?.length > 0 && <RenderMenu />}
        </menu>
      )}
    </>
  );
}
