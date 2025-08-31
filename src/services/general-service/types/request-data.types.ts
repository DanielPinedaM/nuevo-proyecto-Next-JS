/**
metodos HTTP
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods */
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
Tipos de datos (formatos) de respuesta en fecth
https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods */
type TResponseType = "json" | "text" | "blob" | "arrayBuffer" | "formData";

/**
¿incluir cookies?
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials */
type TCookiesCredentials = "omit" | "same-origin" | "include";

/**
type de query params */
type TQueryParams = Record<string, string | number | boolean | (string | number | boolean)[]>;

/**
type de headers */
type THeaders = Record<string, string | number>;

/**
parametros de funcion httpService para llamar a la API */
export interface IRequestOptions<T = any> {
  body?: T;
  queryParams?: TQueryParams;
  headers?: THeaders;
  responseType?: TResponseType;
  showLoader?: boolean;
  validateResponse?: boolean;
  showLogger?: boolean;

  //tokenInHeaders?: boolean;
  cookieHttpOnly?: TCookiesCredentials;
}

/**
parametros de funcion errorLogs() q se imprimen por consola  cuando hay errores */
export interface IObjectLogs {
  message?: string;
  method?: Method;
  url?: string;
  options?: IRequestOptions;
  result?: IResponse;
  response?: Response | null;
  validateResponse?: boolean;
  showLogger?: boolean;
}

/**
asi es como responde la API */
export interface IResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

/**
validar respuesta del backend */
export interface IValidateApiResponse<T = any> {
  result: IResponse | T;
  responseType: TResponseType;
  method: Method;
  url: string;
  options: IRequestOptions;
  response: Response | null;
}

/**
validar:
- URL q llama al endpoint
- q tenga conexion a internet */
export interface IParamsValidateOptions {
  url: string;
  method: Method;
  options?: IRequestOptions;
}
export interface IIsValidOptions {
  valid: boolean;
}
