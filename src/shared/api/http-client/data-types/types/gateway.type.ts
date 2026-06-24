/**
metodos HTTP
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
Tipos de datos (formatos) de respuesta en fecth
https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods */
export type TResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';

/**
¿incluir cookies?
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials */
export type TCookiesCredentials = 'omit' | 'same-origin' | 'include';

/**
type de query params */
export type TQueryParams = Record<
  string,
  string | number | boolean | (string | number | boolean)[]
>;

/**
type de headers */
export type THeaders = Record<string, string | number>;
