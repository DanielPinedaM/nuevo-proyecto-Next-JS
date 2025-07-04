'use client';
import { useQueryParams } from '@/hooks/useQueryParams';
import { globalTailwindStyle } from '@/types/constant/const-layout';
import {
  ISearchTable,
} from '@/types/interface/interface-home-tables';
import debounce from 'just-debounce-it';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IInputSearchParams {
  label: string;
  placeholder: string;
  keySearchParams: string;
}

/**
Componente con campo de texto que actualiza el URL query string
y realiza una búsqueda dependiendo del parámetro `search` en la URL. */
export default function InputSearchParams({ label, placeholder, keySearchParams = "search" }: IInputSearchParams) {
  const { setQueryParams } = useQueryParams();

  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();

  const { register, watch, setValue } = useForm<ISearchTable>();
  const [inputSearch] = watch(['inputSearch']);

  useEffect(() => {
    // setear input value SI existe un search query en la URL
    const currentSearchQuery: string = searchParams.get(keySearchParams) ?? '';
    setValue('inputSearch', currentSearchQuery);
  }, []);

  // espera a q el usuario termine de escribir para poder empezar a buscar
  const debouncedListTables = useCallback(
    debounce((newInputSearch: string): void => {
      // actualizar ruta cuando se escribe texto en el <input>
      if (newInputSearch) {
        setQueryParams({ [keySearchParams]: newInputSearch }, { replaceAll: true, showLoader: false });
      } else {
        // limpiar la URL cuando el input está vacío
        router.push(pathname);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (inputSearch?.startsWith(' ')) {
      // en el input NO permitir escribir espacio en blanco al principio
      setValue('inputSearch', inputSearch.trimStart());
    } else {
      debouncedListTables(inputSearch);
    }
  }, [inputSearch]);

  return (
    <label>
      <span className='cursor-pointer font-normal'>{label}</span>
      <InputText
        autoComplete='off'
        placeholder={placeholder}
        className={`${globalTailwindStyle.input.general} block w-full`}
        {...register('inputSearch')}
      />
    </label>
  );
}
