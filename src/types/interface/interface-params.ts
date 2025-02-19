/* eslint-disable @typescript-eslint/no-explicit-any */

/**
* Interfaz para definir las propiedades de los componentes de servidor (`'use server'`) en `page.tsx`.
* - `params`: Contiene los parámetros dinámicos de la URL en rutas con `[slug]`.
* - `searchParams`: Representa los parámetros de consulta (query string) en la URL. */
export default interface IParams {
  params?: { slug: any } | undefined | any;
  searchParams?: { [key: string]: string | string[] | undefined }  | any
}
