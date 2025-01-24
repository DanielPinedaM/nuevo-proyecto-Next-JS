/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorLogs, getToken, handleUnauthorized, loggerRequestInServer, uploadFile } from "./func/requestFunctions";
import { IRequestOptions, Method } from "./types/requestDataTypes";

/**
* funcion general para llamar a API */
export async function httpRequest<T = any>(
  method: Method,
  url: string = "",
  options: IRequestOptions = {}
): Promise<T> {
  const {
    isASecurityEndpoint = false,
    body,
    queryParams,
    headers = {},
    responseType = "json",
  } = options;

  if (typeof url !== "string" || url?.trim() === "" || String(url)?.includes("undefined")) {
    errorLogs({
      message: "la url tiene que ser un string y NO puede estar vacia ''",
      method,
      url,
      options,
    });
    return {} as T;
  }

  // Construir encabezados
  const finalHeaders: HeadersInit = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, String(value)])
  );

  // Agregar token si el endpoint lo necesita
  if (isASecurityEndpoint) {
    const token = getToken();
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
      loggerRequestInServer({
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
      console.error("no se pudo capturar error de la API \n");
    }

    // re-dirigir a /iniciar-sesion cuando el status de la respuesta de la api sea 401
    if (parsedError?.status === 401) {
      handleUnauthorized();
    } else if (parsedError?.status === 404) {
      console.error(`❌ error 404 Not Found, endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`);
    }
  }

  // retornar respuesta de la api sin importar si fue exitosa o no
  return result as T;
}
