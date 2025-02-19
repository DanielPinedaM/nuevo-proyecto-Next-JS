/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUseClient } from "@/utils/func/general";
import { isFile } from "@/utils/func/dataType";
import {
  errorHandling,
  errorLogs,
  getToken,
  successLogs,
} from "@/services/generalService/func/requestFunctions";
import {
  IRequestOptions,
  IResponse,
  Method,
} from "@/services/generalService/types/requestDataTypes";
import { ILoaderState } from "@/store/loaderStore";

/**
funcion general para llamar a API */
export async function httpRequest<T = any>(
  method: Method,
  url: string = "",
  options: IRequestOptions = {}
): Promise<T> {
  if (!process.env.NEXT_PUBLIC_AUTH_LOGIN) {
    errorLogs({
      message:
        "la VARIABLE DE ENTORNO PARA EL LOGIN tiene que ser tipo string y NO puede estar vacia ''",
      method,
      url,
      options,
    });

    return {} as T;
  }

  if (
    !url ||
    String(url)?.includes("undefined") ||
    String(url)?.includes("null") ||
    String(url)?.includes("NaN") ||
    !String(url)?.includes("http")
  ) {
    errorLogs({
      message: "URL invalida",
      method,
      url,
      options,
    });

    return {} as T;
  }

  // loader global q se muestra y oculta en componentes cliente 'use client'
  let loaderStore: ILoaderState | null = null;

  // acceder al valor booleano del loader
  if (isUseClient()) {
    const { useLoaderStore } = await import("@/store/loaderStore");
    loaderStore = useLoaderStore.getState();
    loaderStore.showLoader();
  }

  const {
    // enviar token en TODOS los endpoint, EXCEPTO al iniciar sesion
    isASecurityEndpoint = url !== process.env.NEXT_PUBLIC_AUTH_LOGIN,

    body,
    queryParams,
    headers = {},
    responseType = "json",
  } = options;

  // Construir encabezados
  const finalHeaders: HeadersInit = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, String(value)])
  );

  // Agregar token si el endpoint lo necesita
  if (isASecurityEndpoint) {
    const token = await getToken();

    if (!token) {
      errorLogs({
        message:
          "NO se pudo obtener token en el " + isUseClient()
            ? "CLIENTE 'use client'"
            : "SERVIDOR 'use server'" + " \ntoken " + token,
        method,
        url,
        options,
      });

      return {} as T;
    }

    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  // No establecer 'Content-Type' si el body es un FormData (archivo)
  if (!isFile(body)) {
    finalHeaders["Content-Type"] = "application/json";
  }

  // Convertir queryParams si el endpoint es por query
  const queryString = queryParams
    ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}`
    : "";
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

  const response: Response = await fetch(requestUrl, fetchOptions);

  let result: any;

  try {
    if (responseType === "json") {
      result = (await response.json()) as T;
    } else if (responseType === "text") {
      result = (await response.text()) as T;
    } else if (responseType === "blob") {
      // capturar respuesta de error de la API cuando falla la descarga del archivo
      const contentType: string = response?.headers?.get("content-type") ?? "";

      if (contentType && contentType?.includes("application/json")) {
        result = (await response.json()) as T;

        errorLogs({
          message: "error al descargar archivo(s)",
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
    } else {
      result = response;

      errorLogs({
        message: "formato de respuesta responseType no valido",
        method,
        url,
        options,
        result,
        response,
      });
    }

    if (response.ok === false || result.success === false) {
      errorLogs({
        message: "al ejecutar peticion HTTP",
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
      });
    }
  } catch (error: any) {
    let parsedError: IResponse | null = null;

    try {
      if (error?.message) {
        parsedError = JSON?.parse(error.message);
      }
    } catch {
      console.error("no se pudo capturar error de la API \n", error);
    }

    const { status } = parsedError ?? {};

    errorHandling(status, url);
  } finally {
    // ocultar loader en componente cliente 'use cliente'
    if (isUseClient()) {
      if (loaderStore) {
        loaderStore.hideLoader();
      } else {
        errorLogs({
          message: "error al OCULTAR icono de loader en componente cliente 'use cliente'",
          method,
          url,
          options,
          result,
          response,
        });
      }
    }
  }

  // retornar respuesta de la api sin importar si fue exitosa o no
  return result as T;
}
