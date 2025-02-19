"use client";
import { globalTailwindStyle } from "@/types/constant/const-layout";
import {
  IInputTypeTextSearchByURLqueryString,
  ISearchTable,
} from "@/types/interface/administrador/tablas/interface-home-tables";
import debounce from "just-debounce-it";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

/**
Componente con campo de texto que actualiza el URL query string
y realiza una búsqueda dependiendo del parámetro `search` en la URL. */
export default function InputTypeTextSearchByURLqueryString({
  label,
  placeholder,
}: IInputTypeTextSearchByURLqueryString) {
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();

  const { register, watch, setValue } = useForm<ISearchTable>();
  const [inputSearch] = watch(["inputSearch"]);

  useEffect(() => {
    // setear input value SI existe un search query en la URL
    const currentSearchQuery: string = searchParams.get("search") ?? "";
    setValue("inputSearch", currentSearchQuery);
  }, []);

  // espera a q el usuario termine de escribir para poder empezar a buscar
  const debouncedListTables = useCallback(
    debounce((newInputSearch: string): void => {
      // actualizar ruta cuando se escribe texto en el <input>
      if (newInputSearch) {
        router.push(`${pathname}?${createQueryString("search", newInputSearch)}`);
      } else {
        // limpiar la URL cuando el input está vacío
        router.push(pathname);
      }
    }, 300),
    []
  );

  const createQueryString = useCallback(
    (name: string, value: string): string => {
      const params: URLSearchParams = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (inputSearch?.startsWith(" ")) {
      // en el input NO permitir escribir espacio en blanco al principio
      setValue("inputSearch", inputSearch.trimStart());
    } else {
      debouncedListTables(inputSearch);
    }
  }, [inputSearch]);

  return (
    <label>
      <span className="cursor-pointer font-normal">{label}</span>
      <InputText
        autoComplete="off"
        placeholder={placeholder}
        className={`${globalTailwindStyle.input.general} block w-full`}
        {...register("inputSearch")}
      />
    </label>
  );
}
