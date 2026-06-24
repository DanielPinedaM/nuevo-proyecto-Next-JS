import {
  Method,
  TCookiesCredentials,
  THeaders,
  TQueryParams,
  TResponseType,
} from '@/shared/api/http-client/data-types/types/gateway.type';

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
  executeErrorHandling?: boolean;

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
