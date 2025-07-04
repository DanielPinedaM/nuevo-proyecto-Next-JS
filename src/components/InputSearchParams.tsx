'use client';
import { useQueryParams } from '@/hooks/useQueryParams';
import { globalTailwindStyle } from '@/types/constant/const-layout';
import debounce from 'just-debounce-it';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';

interface IInputSearchParams {
  label?: string;
  placeholder?: string;
  keySearchParams?: string;
}

/**
Componente q actualiza el URL query params con lo q se escribe en el input text */
export default function InputSearchParams({
  label,
  placeholder,
  keySearchParams = 'search',
}: IInputSearchParams) {
  const { setQueryParams } = useQueryParams();

  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    // setear input value SI existe un search query en la URL
    const currentSearchQuery: string = searchParams.get(keySearchParams) ?? '';
    setInputValue(currentSearchQuery);
  }, []);

  const onChangeInputValue = (value: string): void => {
    let newValue: string = value;

    // en el input NO permitir escribir espacio en blanco al principio
    if (value.startsWith(' ')) {
      newValue = newValue.trimStart();
    } else {
      debouncedListTables(newValue);
    }

    setInputValue(newValue);
  };

  // espera a q el usuario termine de escribir para poder empezar a buscar
  const debouncedListTables = useCallback(
    debounce((newInputSearch: string): void => {
      // actualizar ruta cuando se escribe texto en el <input>
      if (newInputSearch) {
        setQueryParams(
          { [keySearchParams]: newInputSearch },
          { replaceAll: true, showLoader: false }
        );
      } else {
        // limpiar la URL cuando el input está vacío
        router.push(pathname);
      }
    }, 300),
    []
  );

  return (
    <label>
      {
        label && (
          <span className='cursor-pointer font-normal'>{label}</span>
        )
      }
      <InputText
        autoComplete='off'
        placeholder={placeholder ?? ""}
        className={`${globalTailwindStyle.input.general} block w-full`}
        value={inputValue}
        onChange={(e) => onChangeInputValue(e.target.value)}
      />
    </label>
  );
}
