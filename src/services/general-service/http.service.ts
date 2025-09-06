/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUseClient } from "@/utils/func/general.utils";
import { forceConvertToString, isFile, literalObjectLength } from "@/utils/func/dataType.utils";
import {
  defaultSecurityEndpoint,
  errorHandling,
  errorLogs,
  getToken,
  internetConnection,
  isNoContentStatus,
  isValidUrl,
  responseFile,
  successLogs,
  validateApiResponse,
  validateBodyWithGetMethod,
} from "@/services/general-service/utils/request-functions.utils";
import {
  IRequestOptions,
  IResponse,
  IIsValidOptions,
  Method,
} from "@/services/general-service/types/request-data.types";
import { ILoaderState } from "@/store/loader/loaderStore";

/*
 ***************************
 * validar peticiones HTTP *
 *************************** */
async function executeRequest<T = any>(
  method: Method,
  url: string = "",
  options: IRequestOptions = {}
): Promise<IResponse | any> {
  const {
    body,
    queryParams,
    headers = {},
    responseType = "json",

    // ¿mostrar icono de cargando?
    showLoader = true,

    // ¿mostrar logs en consola?
    showLogger = true,

    // ¿la API responde con el tipo IResponse?
    validateResponse = true,

    // enviar token en TODOS los endpoint, EXCEPTO los q estan en const unprotectedURLs: string[]
    //tokenInHeaders = defaultSecurityEndpoint(url),
    cookieHttpOnly = defaultSecurityEndpoint(url) ? "include" : "same-origin",
  } = options;

  // validar URL q llama al endpoint
  const _isValidUrl: IIsValidOptions = isValidUrl({ url, method, options });
  if (!_isValidUrl.valid) {
    return {
      success: false,
      status: 400,
      message: "URL invalida",
      data: [],
    };
  }

  // validar q tenga conexion a internet
  // window?.navigator?.onLine no siempre funciona
  const _internetConnection: IIsValidOptions = internetConnection({
    url,
    method,
    options,
  });
  if (!_internetConnection.valid) {
    return {
      success: false,
      status: 503,
      message: "conéctese a internet para que la página web pueda funcionar",
      data: [],
    };
  }

  // Validar que el método GET NO tenga body
  const _validateBodyWithGetMethod: IIsValidOptions = validateBodyWithGetMethod({
    url,
    method,
    options,
  });
  if (!_validateBodyWithGetMethod.valid) {
    return {
      success: false,
      status: 503,
      message: `error el método HTTP GET NO puede tener body ${JSON.stringify(body)}`,
      data: [],
    };
  }

  // loader global q se muestra y oculta en componentes cliente 'use client'
  let loaderStore: ILoaderState | null = null;

  // acceder al valor booleano del loader
  if (isUseClient() && showLoader) {
    const { useLoaderStore } = await import("@/store/loader/loaderStore");
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

  // No establecer 'Content-Type' si el body es un archivo
  if (!isFile(body)) {
    finalHeaders["Content-Type"] = "application/json";
  }

  // Agregar token si el endpoint lo necesita
  /*
  des-comentar para enviar token por headers authorization Bearer. ⚠️ Esto se puede hackear con ataque XSS 🚨
  if (tokenInHeaders) {
    const token = await getToken();

    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    } else {
      const message: string =
        "NO se pudo obtener token en el " +
        (isUseClient() ? "CLIENTE 'use client'" : "SERVIDOR 'use server'") +
        " \ntoken " +
        token;

      errorLogs({
        message,
        method,
        url,
        options,
        showLogger
      });

      if (showLoader) {
        loaderStore?.hideLoader();
      }

      return { success: false, status: 401, message, data: [] };
    }
  } */

  // Convertir queryParams si el endpoint es por query
  const queryString = queryParams
    ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}`
    : "";
  const requestUrl: string = `${url}${queryString}`;

  // Configurar opciones de fetch
  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders,
    credentials: cookieHttpOnly,
  };

  if (body) {
    // enviar body directamente cuando el body contiene un archivo (FormData)
    if (isFile(body)) {
      fetchOptions.body = body as BodyInit;
    } else {
      // cuando se envia un JSON y NO se hace JSON.stringify el backend de NestJS da error
      fetchOptions.body = JSON.stringify(body);
    }
  }

  // variable q usa fetch para llamar a la API
  let response: Response | null = null;

  // intenta convertir la respuesta de la API a 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
  // y guarda la respuesta de la API
  let result: IResponse | any = {
    success: false,
    status: 500,
    message: "sin procesar",
    data: [],
  };

  try {
    response = await fetch(requestUrl, fetchOptions);

    // Validar HTTP status que NO tienen contenido (Content-Length 0), por lo que no se debe llamar a await response.json()
    if (isNoContentStatus(response?.status)) {
      successLogs({
        method,
        url,
        options,
        response,
        validateResponse,
        showLogger,
      });

      return {
        success: true,
        status: response.status,
        message: response?.statusText ?? "sin contenido",
        data: [],
      };
    }

    if (responseType === "json") {
      result = (await response.json()) as T;
    } else if (responseType === "text") {
      result = (await response.text()) as T;
    } else if (["blob", "arrayBuffer", "formData"].includes(responseType)) {
      result = (await responseFile(
        response,
        responseType,
        method,
        url,
        options,
        `error la API respondió con tipo JSON y se espera un tipo responseType ${responseType}`
      )) as T;
    } else {
      const message = `formato de respuesta responseType ${responseType} no valido en http.service.ts`;

      if (validateResponse) {
        result = {
          success: false,
          status: 400,
          message,
          data: [],
        };
      } else {
        result = response;
      }

      errorLogs({
        message,
        method,
        url,
        options,
        result,
        response,
        showLogger,
      });
    }

    // true   -> API responde con JSON:           array, objeto literal, etc.
    // false  -> API responde con tipo archivo:   FormData, Blob, etc.
    const responseTypeIsJson = Boolean(responseType === "json");

    // error: el http status de fetch response.status es diferente al de la respuesta de la API result.status
    if (
      validateResponse &&
      responseTypeIsJson &&
      response?.status &&
      result?.status &&
      response?.status !== result?.status
    ) {
      const message = `el error esta en el backend: código HTTP de fetch ${response.status} y la API ${result?.status} no coinciden`;

      errorLogs({
        message,
        method,
        url,
        options,
        result,
        response,
        showLogger,
      });

      return {
        success: false,
        status: response.status,
        message,
        data: [],
      };
    }

    // forzar a q fetch salte al catch cuando la peticion sea erronea response.status >= 400
    const noFetchResponse = !response;
    const fetchError: boolean = response?.ok === false || response?.status >= 400;

    const noApiResult = !result;
    const apiError: boolean =
      validateResponse &&
      responseTypeIsJson &&
      (result?.success === false || result?.status >= 400);

    if (noFetchResponse || fetchError || noApiResult || apiError) {
      errorLogs({
        message:
          validateResponse && result?.message ? result.message : "error al ejecutar peticion HTTP",
        method,
        url,
        options,
        result,
        response,
        showLogger,
      });

      errorHandling(response?.status, url);
    } else {
      successLogs({
        method,
        url,
        options,
        result,
        response,
        validateResponse,
        showLogger,
      });
    }
  } catch (error: any) {
    console.error("❌ error en http.service.ts \n", error);
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
          showLogger,
        });
      }
    }

    // retornar respuesta de la API sin importar si fue exitosa o no
    if (validateResponse) {
      // forzar a q la API responda con el tipo IResponse ó con un archivo
      return validateApiResponse({ result, response, responseType, method, url, options });
    } else {
      // la API puede responder con lo q sea
      if (isFile(result) || ["text", "blob", "arrayBuffer", "formData"].includes(responseType)) {
        return result;
      } else {
        return {
          success: response?.ok ?? false,
          status: response?.status ?? 500,
          message: response?.statusText ?? "Error al ejecutar la petición HTTP",
          data: result,
        };
      }
    }
  }
}

/*
 *********************************************************
 * funciones con metodos HTTP para llamar endpoint (API) *
 ********************************************************* */

export async function GET(
  url: string = "",
  options: IRequestOptions = {}
): Promise<IResponse | any> {
  return executeRequest("GET", url, options);
}

export async function POST(
  url: string = "",
  options: IRequestOptions = {}
): Promise<IResponse | any> {
  return executeRequest("POST", url, options);
}

export async function PUT(
  url: string = "",
  options: IRequestOptions = {}
): Promise<IResponse | any> {
  return executeRequest("PUT", url, options);
}

export async function PATCH(
  url: string = "",
  options: IRequestOptions = {}
): Promise<IResponse | any> {
  return executeRequest("PATCH", url, options);
}

export async function DELETE(
  url: string = "",
  options: IRequestOptions = {}
): Promise<IResponse | any> {
  return executeRequest("DELETE", url, options);
}
