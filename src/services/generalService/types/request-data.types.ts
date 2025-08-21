/* eslint-disable @typescript-eslint/no-explicit-any */
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
Tipos de datos (formatos) de respuesta en fecth
https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods */
export type IResponseType = "json" | "text" | "blob" | "arrayBuffer" | "formData";

/**
¿incluir cookies?
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials */
type TCookiesCredentials = "omit" | "same-origin" | "include";

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

// primitivos
type TPrimitive = string | number | boolean | null | undefined | symbol | bigint;

// objetos genericos
type TKeyRecord = string | number | symbol;
type TRecursive = TPrimitive | TRecursiveObject | TAnyArray;
type TRecursiveObject =
  | { [key: string]: TRecursive }
  | { [key: number]: TRecursive }
  | { [key: symbol]: TRecursive };
type TObject = object | Record<TKeyRecord, unknown>;

// arrays
type TAnyArray = Array<TPrimitive | TObject | TAnyArray>;

// archivos
export type TFiles =
  | Blob
  | File
  | ArrayBuffer
  | ArrayBufferView
  | DataView
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array;

// formularios
export type TFormTypes = FormData | URLSearchParams;

// streams
type TStreamTypes = ReadableStream<any> | NodeJS.ReadableStream;

// tipo body
type TBody =
  | TPrimitive
  | TObject
  | TRecursiveObject
  | TAnyArray
  | TFiles
  | TFormTypes
  | TStreamTypes;

/**
parametros de funcion httpService para llamar a la API */
export interface IRequestOptions {
  body?: TBody;
  queryParams?: Record<string, string | number | boolean | (string | number | boolean)[]>;
  headers?: Record<string, string | number>;
  responseType?: IResponseType;
  showLoader?: boolean;
  validateResponse?: boolean;

  isASecurityEndpoint?: boolean;
  credentials?: TCookiesCredentials;
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
}

interface IData {
  timestamp: string;
  path: string;
  error: string | null;
}

/**
asi es como responde la API */
export interface IResponse {
  success: boolean;
  status: number;
  message: string;
  data: IData | any;
}

/**
validar respuesta del backend */
export interface IValidateApiResponse {
  result: IResponse | any;
  responseType: IResponseType;
  method: Method;
  url: string;
  options: IRequestOptions;
  response: Response | null;
}
