/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUseClient } from "@/utils/func/general";
import {
  errorLogs,
  getToken,
  handleUnauthorized,
  successLogs,
  uploadFile,
} from "@/services/generalService/func/requestFunctions";
import { IRequestOptions, Method } from "@/services/generalService/types/requestDataTypes";
import { ILoaderState } from "@/store/loaderStore";

/**
funcion general para llamar a API */
export async function httpRequest<T = any>(
  method: Method,
  url: string = "",
  options: IRequestOptions = {}
): Promise<T> {
  if (!url) {
    errorLogs({
      message: "la URL tiene que ser tipo string y NO puede estar vacia ''",
      method,
      url,
      options,
    });

    return {} as T;
  }

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

  // loader global q se muestra y oculta en componentes cliente 'use client'
  let loaderStore: ILoaderState | null = null;

  // acceder al valor booleano del loader
  if (isUseClient()) {
    try {
      const { useLoaderStore } = await import("@/store/loaderStore");

      loaderStore = useLoaderStore.getState();
      loaderStore.showLoader();
    } catch (error) {
      loaderStore = null;

      console.error("❌ ", error);

      errorLogs({
        message: "error al mostrar/ocultar icono de loader en componente cliente 'use cliente'",
        method,
        url,
        options,
      });
    }
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
  if (!uploadFile(body)) {
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
    if (uploadFile(body)) {
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
      result = (await response.blob()) as T;
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

      throw new Error("");
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
    const { message } = error;

    let parsedError;

    try {
      if (message) {
        parsedError = JSON?.parse(message);
      }
    } catch {
      console.error("no se pudo capturar error de la API \n", error);
    }

    // re-dirigir a /iniciar-sesion cuando el status de la respuesta de la api sea 401
    if (
      parsedError?.status === 401 &&
      // NO detener la ejecucion del codigo al de-codificar token en middleware.ts
      // redirect() solamente funciona en componentes servidor, NO en middleware.ts
      url !== process.env.NEXT_PUBLIC_AUTH_PROFILE
    ) {
      console.error("❌ httpRequest.ts - error 401: Unauthorized - NO tiene permisos para acceder");

      handleUnauthorized();
    }

    if (parsedError?.status === 404) {
      console.error(
        `❌ error 404: Not Found - endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`
      );
    }
  } finally {
    // ocultar loader en componente cliente 'use cliente'
    if (isUseClient()) {
      try {
        if (!loaderStore) throw new Error("");

        loaderStore.hideLoader();
      } catch (error) {
        console.error("❌ error ", error);

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
