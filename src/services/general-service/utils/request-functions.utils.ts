/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import errorNotification from "@/components/dialog/notification/errorNotification";
import { nameCookieKey } from "@/models/constants/cookie-storage.constants";
import { constPath } from "@/models/constants/path.constants";
import {
  IObjectLogs,
  IParamsValidateOptions,
  IRequestOptions,
  IResponse,
  IIsValidOptions,
  IValidateApiResponse,
  Method,
} from "@/services/general-service/types/request-data.types";
import {
  isFile,
  isLiteralObject,
  isNumber,
  isString,
  literalObjectLength,
} from "@/utils/func/dataType.utils";
import { isUseClient } from "@/utils/func/general.utils";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

function pathnameIsLogin(): boolean {
  if (!isUseClient()) {
    console.error(
      "❌ error, NO se puede determinar si la URL actual es iniciar sesion /",
      constPath.login
    );
    return false;
  }

  const login: string = "/" + constPath.login;

  const pathname: string = window.location.pathname;

  return pathname === login;
}

function redirectToLoginInUseClient(): void {
  if (!isUseClient()) {
    console.error("❌ error al re-dirigir a /", constPath.login);
    return;
  }

  const login: string = "/" + constPath.login;

  if (!pathnameIsLogin()) {
    window.location.href = login;
  }
}

/**
http status sin contenido Content-Length 0 */
export function isNoContentStatus(status: number): boolean {
  if (typeof status !== "number") {
    console.error(
      "❌ error: el HTTP status NO es un numero\n status",
      status,
      "\ntypeof status ",
      typeof status
    );
    return false;
  }

  return (status >= 100 && status < 200) || [204, 205, 304].includes(status);
}

/**
validar URL q llama al endpoint */
export function isValidUrl({
  url,
  method,
  options,
}: IParamsValidateOptions): IIsValidOptions | IResponse {
  const isInvalid: boolean =
    !url || !isString(url) || String(url).trim() === "" || !String(url).startsWith("http");

  if (isInvalid) {
    const message: string = "URL invalida";

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return { success: false, status: 400, message, data: [] };
  }

  return { valid: true };
}

/**
Validar que el método GET NO tenga body */
export function validateBodyWithGetMethod({
  url,
  method,
  options,
}: IParamsValidateOptions): IIsValidOptions | IResponse {
  const body: any = options?.body;

  const isInvalid: boolean = Boolean(body) && method === "GET";

  if (isInvalid) {
    const message: string = `❌ error el método GET NO puede tener body ${JSON.stringify(body)}`;

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return { success: false, status: 400, message, data: [] };
  }

  return { valid: true };
}

/**
validar q tenga conexion a internet,
window?.navigator?.onLine no siempre funciona */
export function internetConnection({
  url,
  method,
  options,
}: IParamsValidateOptions): IIsValidOptions | IResponse {
  const isInvalid: boolean = isUseClient() && !window?.navigator?.onLine;

  if (isInvalid) {
    const message: string = "Conéctese a internet para que la página web pueda funcionar";

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

  return { valid: true };
}

/**
obtener token en componentes cliente 'use client' y servidor 'use server' */
export async function getToken(): Promise<string | null> {
  let token: string | null = null;

  // 'use client'
  if (isUseClient()) {
    token = (await getCookie(nameCookieKey.accessToken)) ?? null;
  } else {
    // 'use server'
    try {
      const headers = await import("next/headers");
      const cookieStore = await headers.cookies();
      token = cookieStore.get(nameCookieKey.accessToken)?.value ?? null;
    } catch (error) {
      console.error(
        "❌ error en dynamic import de import { headers } from 'next/headers', NO se puedo obtener el token en componente servidor 'use server'",
        error
      );

      token = null;
    }
  }

  return token;
}

/**
funcion para cerrar sesion en 'use client' y 'use server', */
export function handleUnauthorized(): void {
  const login: string = "/" + constPath.login;

  // 1) eliminar token
  // 2) re-dirigir a iniciar sesion
  // en componentes:

  // 'use client'
  if (isUseClient()) {
    redirectToLoginInUseClient();

    // 'use server'
  } else {
    redirect(login);
  }
}

/**
funcion para devolver a la pagina web anterior en 'use client' y 'use server', */
export function returnToBrowserHistory(): void {
  const login: string = "/" + constPath.login;

  // 'use client'
  if (isUseClient()) {
    if (window.history.length > 1) {
      window.history.go(-1);
    } else {
      redirectToLoginInUseClient();
    }

    // 'use server'
  } else {
    redirect(login);
  }
}

/**
imprimir por consola los errores */
export function errorLogs(objectLogs: IObjectLogs): void {
  // NO imprimir logs en produccion
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") return;

  const { message, method, url, options, result, response, showLogger } = objectLogs;

  if (!showLogger) return;

  if (isUseClient()) {
    console.error("\n❌ error en el CLIENTE 'use client'");
  } else {
    console.error("\n❌ error en el SERVIDOR 'use server'");
  }

  if (message) console.error("❌ error ", message);
  if (method) console.error("metodo HTTP", method);
  if (url) console.error("url ", url);
  if (process?.env?.NEXT_PUBLIC_ENVIRONMENT)
    console.error(
      `las variables de entorno estan apuntando al ambiente de ➡️ ${process.env.NEXT_PUBLIC_ENVIRONMENT} ⬅️`
    );

  if (result || response) console.error("❌ respuesta de la API");

  // imprimir respuesta de la API
  if (result) console.error(result);

  // imprimir respuesta de fetch
  //if (response) console.error(response);

  if (options) console.error("options ", options);

  console.info("\n");
}

/**
imprimir por consola las solicitudes HTTP que se realizan con éxito en el servidor 'use server' */
export function successLogs(objectLogs: IObjectLogs): void {
  // NO imprimir logs en produccion
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") return;

  const { method, url, options, response, result, validateResponse, showLogger } = objectLogs;

  if (!showLogger) return;

  console.info("\n", "✅ ", "[", method, "]", url);

  if (isFile(options?.body)) {
    console.info("✅ archivo(s) subido(s)");
  }

  if (options?.body) {
    console.info("body ", options?.body);
  }

  if (isNoContentStatus(response?.status as number)) {
    return;
  }

  if (!result) return;

  let { success, message, data } = result;

  let dataMessage: string = "";

  if (data) {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        dataMessage = "array vacío ➡️ (0) []";
      } else {
        // data es un array de objetos [{}]
        const areAllObjects: boolean = data?.every(
          (item) => typeof item === "object" && item && item !== null
        );
        if (areAllObjects) {
          dataMessage = `array de objetos con ${data.length} elemento ➡️ (${data.length}) [{}]`;
        } else {
          // data es un array []
          dataMessage = `array de ${data.length} elementos ➡️ (${data.length}) []`;
        }
      }
    }

    // data es un objeto literal {}
    else if (
      Object.getPrototypeOf(data) === Object.prototype ||
      Object.prototype.toString.call(data) === "[object Object]"
    ) {
      const length: number | null = literalObjectLength(data);

      if (length === 0) {
        dataMessage = "objeto literal vacío ➡️ (0) {}";
      } else {
        dataMessage = `objeto literal con ${length} keys ➡️ (${length}) {}`;
      }
    }
  }

  const objectSuccesResponse: IResponse = {
    success,
    status: response?.status as number,
    message,
    data: dataMessage,
  };

  if (isUseClient()) {
    console.info("componente CLIENTE 'use client'");
  } else {
    console.info("componente SERVIDOR 'use server'");
  }

  console.info(`respuesta de la API apuntando a ➡️ ${process.env.NEXT_PUBLIC_ENVIRONMENT} ⬅️ \n`);

  if (validateResponse) {
    console.info(objectSuccesResponse);
  } else {
    console.info(result);
  }

  console.info("\n");
}

/**
manejar mensajes de error q vienen del servidor (API) */
export function errorHandling(status: number | undefined, url: string): void {
  if (!status) return;

  if (
    status === 401 &&
    // NO detener la ejecucion del codigo al de-codificar token en middleware.ts
    // redirect() solamente funciona en componentes servidor, NO en middleware.ts
    url !== process.env.NEXT_PUBLIC_AUTH_PROFILE
  ) {
    console.error(
      "❌ http.service.ts - Error 401: unauthenticated",
      "\nDetalle: El usuario no está autenticado o la sesión ha expirado",
      "\nAcción: Re-dirigir al usuario a la página de inicio de sesión",
      "\nURL solicitada: ",
      url
    );

    // re-dirigir a /iniciar-sesion cuando el status de la respuesta de la api sea 401
    handleUnauthorized();

    if (!pathnameIsLogin()) {
      errorNotification("Inicie sesión para continuar");
    }
  } else if (status === 403) {
    console.error(
      "❌ http.service.ts - Error 403: Forbidden",
      "\nDetalle: El usuario está autenticado pero no tiene permisos para acceder al recurso",
      "\nAcción: Mostrar un mensaje de 'acceso denegado' o re-dirigir y re-dirigir a la pagina web anterior en el historial del navegador",
      "\nURL solicitada:",
      url
    );

    // devolverme a la web anterior en el historial cuando el status de la respuesta de la api sea 403
    returnToBrowserHistory();

    if (isUseClient()) {
      errorNotification("Acceso denegado, no tiene permisos para realizar esta acción");
    }
  } else if (status === 404) {
    console.error(
      `❌ http.service.ts - error 404: Not Found - endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`
    );

    errorNotification(
      "Ha ocurrido un error, por favor comuniquese con el administrador del sistema"
    );
  } else if (status >= 500) {
    console.error(`❌ http.service.ts - error en el servidor en la URL ${url}`);

    errorNotification(
      "Ha ocurrido un error, intentalo de nuevo mas tarde, estamos trabajando para solucionarlo"
    );
  }
}

/**
validar respuesta de la API 
para NO detener la ejecucion del front
cuando la API (backend) esta caida */
export function validateApiResponse({
  result,
  response,
  responseType,
  method,
  url,
  options,
}: IValidateApiResponse): IResponse | Blob | FormData {
  const errorMessage: string =
    "❌ Error 503 Service Unavailable - Posibles causas: \n" +
    "1) La API del backend podría estar caída. \n" +
    "2) El backend no está respondiendo con el tipo esperado (IResponse). \n" +
    "3) Si está intentando descargar un archivo, asegúrese de que el backend responda con el tipo json | text | blob | arrayBuffer | formData";

  /* -------- ❌ respuesta ERRONEA -------- */
  const safeResult: IResponse | any = result ?? {};
  const { success, status, message, data, ...rest }: IResponse | any = safeResult;

  // objeto q se devuelve en caso de q NO funcione la respuesta de la API del back
  const finalResponse: IResponse = {
    success: false,
    status: 503,
    message: errorMessage,
    data: [],

    // agregar cualquier key q venga de la API y q sea DIFERENTE de success, status, message y data
    ...rest,
  };

  // retorna el archivo o texto plano recibido del backend
  if (isFile(result) || ["text", "blob", "arrayBuffer", "formData"].includes(responseType))
    return result;

  // a partir de aqui la respuesta de la api tiene q ser un responseType === "json"
  // validar q exista la respuesta de la API del backend
  if (
    !result ||
    !isLiteralObject(result) ||
    typeof result?.success !== "boolean" ||
    !isNumber(result?.status)
  ) {
    errorLogs({
      message: errorMessage,
      method,
      url,
      options,
      result,
      response,
    });

    return finalResponse;
  }

  /* -------- ✅ respuesta EXITOSA -------- */
  // siempre extraer `data` en un solo nivel, eliminando `data.data`
  let searchData: any = result?.data;
  while (typeof searchData === "object" && "data" in searchData) {
    searchData = searchData.data;
  }

  const searchMessage: string =
    isString(result?.message) || isNumber(result?.message) ? result.message : "";

  return {
    ...(result ?? {}),
    message: searchMessage,
    data: searchData,
  };
}

/**
validar env en los q por defecto NO se incluye el token */
export function defaultSecurityEndpoint(url: string): boolean {
  // aqui agregar nuevos env a los q NO se les envia el token al hacer peticion http
  const unprotectedURLs: string[] = [process.env.NEXT_PUBLIC_AUTH_LOGIN] as string[];

  for (const item of unprotectedURLs) {
    if (!isString(item)) {
      console.error(
        `❌ ERROR CRÍTICO\n verifica q el env ${item} este agregado a las variables de entorno \n unprotectedURLs`,
        unprotectedURLs
      );
      return false;
    }
  }

  // validar env en los q NO se incluye en token
  return !unprotectedURLs.some((item: string) => url === item);
}

/**
la API respondio con un tipo archivo */
export async function responseFile<T>(
  response: Response,
  responseType: "blob" | "arrayBuffer" | "formData",
  method: Method,
  url: string,
  options: IRequestOptions,
  message: string
): Promise<T> {
  // capturar respuesta de error de la API cuando falla la descarga del archivo
  const contentType: string = response?.headers?.get("content-type") ?? "";

  if (contentType && contentType?.includes("application/json")) {
    const result = await response.json();

    errorLogs({
      message,
      method,
      url,
      options,
      result,
      response,
    });

    throw new Error(JSON.stringify(result));
  }

  if (responseType === "blob") return (await response.blob()) as T;
  if (responseType === "arrayBuffer") return (await response.arrayBuffer()) as T;
  if (responseType === "formData") return (await response.formData()) as T;

  throw new Error(`formato de respuesta responseType ${responseType} no valido en responseFile`);
}
