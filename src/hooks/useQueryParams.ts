/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useNavigationLoaderStore } from '@/store/loader/navigationLoaderStore';
import { forceConvertToString, literalObjectLength } from '@/utils/func/dataType.utils';

interface IOptionsSetQueryParams {
  replaceAll?: boolean;
  showLoader?: boolean;
  customPathname?: string;
}

export const useQueryParams = () => {
  const { showLoaderNavigation } = useNavigationLoaderStore();
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();

  /**
   * Custom hook para setear (actualizar) query params
   * En vez de usar params.set(), es mejor usar este custom hook setQueryParams()
   * http://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams
   *
   * @param {Object} [paramsObj] — objeto literal con query params a actualizar
   * @param {Object} [customPathname] — ruta personalizada a la cual se le setea los query params, por defecto es la ruta actual
   * @param {boolean} [options.replaceAll] — true = actualizar los nuevos valores cuando las keys de paramsObj existen en los query params, false = reemplazar POR COMPLETO por nuevos query params
   * @param {boolean} [options.showLoader] — true = MOSTRAR icono de cargando, false = OCULTAR icono de cargando */
  const setQueryParams = useCallback(
    (paramsObj: Record<string, any>, options?: IOptionsSetQueryParams): void => {
      if (literalObjectLength(paramsObj) <= 0) return;

      const {
        replaceAll = false,
        showLoader = true,
        customPathname = null,
      } = options ?? {};

      // uso window.location.search porque useSearchParams() NO actualiza la variable oldUrl con el ultimo query params
      const currentParams: URLSearchParams = new URLSearchParams(window.location.search);

      // url ANTES de actualizar query params
      const oldUrl: string = currentParams.toString() 
                                ? `${pathname}?${currentParams.toString()}` 
                                   : pathname;

      const params: URLSearchParams = replaceAll
        ? new URLSearchParams() // se parte de cero, sin query actual
        : new URLSearchParams(currentParams.toString()); // se parte del query actual

      Object.entries(paramsObj).forEach(([key, value]) => {
        params.set(String(key), forceConvertToString(value));
      });

      // url DESPUES de actualizar query params
      const newUrl: string = `${customPathname ?? pathname}?${params.toString()}`;

      // NO actualizar la URL cuando los query params no han cambiado
      if (oldUrl !== newUrl) {
        if (showLoader) {
          showLoaderNavigation();
        }

        router.push(newUrl);
      }
    },
    [router, searchParams, pathname]
  );

  return { setQueryParams };
};
