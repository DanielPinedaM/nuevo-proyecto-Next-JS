/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUseClient } from '@/utils/func/general.utils';
import {
  forceConvertToString,
  isFile,
  isString,
  literalObjectLength,
} from '@/utils/func/dataType.utils';
import {
  defaultSecurityEndpoint,
  errorHandling,
  errorLogs,
  getToken,
  successLogs,
  validateApiResponse,
} from '@/services/generalService/utils/request-functions.utils';
import {
  IRequestOptions,
  IResponse,
  Method,
} from '@/services/generalService/types/request-data.types';
import { ILoaderState } from '@/store/loader/loaderStore';
import errorNotification from '@/components/dialog/notification/errorNotification';

/**
funcion general para llamar a API */
export async function httpRequest<T = any>(
  method: Method,
  url: string = '',
  options: IRequestOptions = {}
): Promise<IResponse | Blob | FormData | any> {
  // validar env en los q NO se incluye en token
  if (!process.env.NEXT_PUBLIC_AUTH_LOGIN) {
    const message: string =
      "la VARIABLE DE ENTORNO PARA EL LOGIN tiene que ser tipo string y NO puede estar vacia ''";

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return { success: false, status: 401, message, data: [] };
  }

  // validar URL q llama al endpoint
  if (
    !url ||
    !isString(url) ||
    String(url).trim() === '' ||
    String(url).includes('undefined') ||
    String(url).includes('null') ||
    String(url).includes('NaN') ||
    !String(url).startsWith('http')
  ) {
    const message: string = 'URL invalida';

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return { success: false, status: 400, message, data: [] };
  }

  // validar q tenga conexion a internet
  if (isUseClient() && !window?.navigator?.onLine) {
    const message: string = 'Conéctese a internet para que la página web pueda funcionar';

    errorNotification(message);

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return {
      success: false,
      status: 503,
      message,
      data: [],
    };
  }

  const {
    // enviar token en TODOS los endpoint, EXCEPTO al iniciar sesion
    isASecurityEndpoint = defaultSecurityEndpoint(url),
    body,
    queryParams,
    headers = {},
    responseType = 'json',
    showLoader = true,
    validateResponse = true,
  } = options;

  if (body && method === 'GET') {
    const message: string = `❌ el metodo GET NO puede tener body ${JSON.stringify(body)}`;

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return { success: false, status: 400, message, data: [] };
  }

  // loader global q se muestra y oculta en componentes cliente 'use client'
  let loaderStore: ILoaderState | null = null;

  // acceder al valor booleano del loader
  if (isUseClient() && showLoader) {
    const { useLoaderStore } = await import('@/store/loader/loaderStore');
    loaderStore = useLoaderStore.getState();
    loaderStore.showLoader();
  }

  // Construir encabezados
  let finalHeaders: HeadersInit = {};

  if (literalObjectLength(headers) > 0) {
    finalHeaders = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [key, String(forceConvertToString(value))])
    );
  }

  // No establecer 'Content-Type' si el body es un FormData (archivo)
  if (!isFile(body)) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  // Agregar token si el endpoint lo necesita
  if (isASecurityEndpoint) {
    const token = await getToken();

    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      const message: string =
        'NO se pudo obtener token en el ' + isUseClient()
          ? "CLIENTE 'use client'"
          : "SERVIDOR 'use server'" + ' \ntoken ' + token;

      errorLogs({
        message,
        method,
        url,
        options,
      });

      if (showLoader) {
        loaderStore?.hideLoader();
      }

      return { success: false, status: 401, message, data: [] };
    }
  }

  // Convertir queryParams si el endpoint es por query
  const queryString = queryParams
    ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}`
    : '';
  const requestUrl: string = `${url}${queryString}`;

  // Configurar opciones de fetch
  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (body) {
    // enviar body directamente cuando el body contiene un archivo (FormData)
    if (isFile(body)) {
      fetchOptions.body = body;
    } else {
      // cuando se envia un JSON y NO se hace JSON.stringify el backend de NestJS da error
      fetchOptions.body = JSON.stringify(body);
    }
  }

  // variable q usa fetch para llamar a la API
  let response: Response | null | any = null;

  // intenta convertir la respuesta de la API a json, text o blob y guarda la respuesta de la API
  let result: null | any = null;

  try {
    response = await fetch(requestUrl, fetchOptions);

    if (responseType === 'json') {
      result = (await response.json()) as T;
    } else if (responseType === 'text') {
      result = (await response.text()) as T;
    } else if (responseType === 'blob') {
      // capturar respuesta de error de la API cuando falla la descarga del archivo
      const contentType: string = response?.headers?.get('content-type') ?? '';

      if (contentType && contentType?.includes('application/json')) {
        result = (await response.json()) as T;

        errorLogs({
          message: 'error al descargar archivo(s) blob',
          method,
          url,
          options,
          result,
          response,
        });

        throw new Error(JSON.stringify(result));
      } else {
        result = (await response.blob()) as T;
      }
    } else if (responseType === 'arrayBuffer') {
      const contentType: string = response?.headers?.get('content-type') ?? '';

      if (contentType && contentType?.includes('application/json')) {
        result = (await response.json()) as T;

        errorLogs({
          message: 'error al descargar archivo(s) arrayBuffer',
          method,
          url,
          options,
          result,
          response,
        });

        throw new Error(JSON.stringify(result));
      } else {
        result = (await response.arrayBuffer()) as T;
      }
    } else if (responseType === 'formData') {
      const contentType: string = response?.headers?.get('content-type') ?? '';

      if (contentType && contentType?.includes('application/json')) {
        result = (await response.json()) as T;

        errorLogs({
          message: 'error al descargar archivo(s) formData',
          method,
          url,
          options,
          result,
          response,
        });

        throw new Error(JSON.stringify(result));
      } else {
        result = (await response.formData()) as T;
      }
    } else {
      result = response;

      errorLogs({
        message: `formato de respuesta responseType ${responseType} no valido`,
        method,
        url,
        options,
        result,
        response,
      });
    }

    if (!response || response?.ok === false || !result || result?.success === false) {
      errorLogs({
        message: 'al ejecutar peticion HTTP',
        method,
        url,
        options,
        result,
        response,
      });

      // saltar al catch y capturar el error dependiendo del status de la respuesta
      throw new Error(JSON.stringify(result));
    } else {
      successLogs({
        method,
        url,
        options,
        result,
        response,
      });
    }
  } catch (error: any) {
    let parsedError: IResponse | null = null;

    try {
      if (error?.message) {
        parsedError = JSON?.parse(error.message);
      }
    } catch {
      console.error('no se pudo capturar error de la API \n', error);
    }

    const { status } = parsedError ?? {};

    errorHandling(status, url);
  } finally {
    // ocultar loader en componente cliente 'use cliente'
    if (isUseClient() && showLoader) {
      if (loaderStore) {
        loaderStore.hideLoader();
      } else {
        errorLogs({
          message: "error al OCULTAR icono de loader en componente cliente 'use cliente'",
          method,
          url,
          options,
          result,
        });
      }
    }
  }

  // retornar respuesta de la API sin importar si fue exitosa o no
  if (validateResponse) {
    // obligar a q la API responda con el tipo IResponse ó con un archivo
    return validateApiResponse({ result, responseType, method, url, options, response });
  } else {
    // la API puede responder con lo q sea
    return result;
  }
}
