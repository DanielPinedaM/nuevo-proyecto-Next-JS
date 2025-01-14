/* eslint-disable prefer-const */
import { objCookie } from "@/types/constant/const-cookie-storage";
import { constPath } from "@/types/constant/const-path";
import { IResponse } from "@/types/interface/interface-response";
import { getCookie } from "cookies-next";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IRequestOptions<B = any> {
  isASecurityEndpoint?: boolean;
  body?: B;
  queryParams?: Record<
    string,
    string | number | boolean | (string | number | boolean)[]
  >;
  headers?: Record<string, string | number>;
  responseType?: "json" | "text" | "blob";
}

interface IErrorLogs<B = any> {
  message?: string;
  method?: Method;
  url?: string;
  options?: IRequestOptions<B>;
  response?: IResponse | Response
}

/**
*funcion para cerrar sesion en 'use client' y 'use server', */
export async  function handleUnauthorized() {
  // 1) eliminar token
  // 2) re-dirigir a iniciar sesion
  // en componentes:

  // 'use client'
  if (typeof window !== "undefined") {
    window.location.href = "/" + constPath.login;

  // 'use server'
  } else {
   console.log("cerrar sesion del lado del servidor")
  }
}

/**
* imprimir por consola los errores */
function errorLogs(objErrorLogs: IErrorLogs): void {
  const {
    message,
    method,
    url,
    options,
    response,
  } = objErrorLogs;

  if (typeof window !== "undefined") {
    console.error("\n ❌ error en el lado del CLIENTE 'use client'");
  } else {
    console.error("\n ❌ error en el lado del SERVIDOR 'use server'");
  }

  if (message) {
    console.error("❌ error ", message);
  }

  if (method) {
    console.error("metodo HTTP", method);
  }

  if (url) {
    console.error("url ", url);
  }

  if (options) {
    console.error("options ", options);
  }

  if (response) {
    console.error("response ", response);
  }
}

async function getToken(): Promise<string | null>  {
   // obtener token en componentes:

  // 'use client'
  if (typeof window !== "undefined") {
    const token = await getCookie(objCookie.token);
    return token ?? null;

  // 'use server'
  } else {
    return Promise.resolve("");
  }
}

export async function httpRequest<T = any, B = any>(
  method: Method,
  url: string = "",
  options: IRequestOptions<B> = {}
): Promise<T> {
  if (typeof url !== "string" || url?.trim() === "") {
    errorLogs({
      message: "la url tiene que ser un string y NO puede estar vacia",
    })
    throw new Error("");
  }

  let {
    isASecurityEndpoint = false,
    body,
    queryParams,
    headers,
    responseType = "json"
  } = options;
  // Agregar encabezados
  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers
  };

  // Agregar token si el endpoint lo necesita
  if (isASecurityEndpoint) {
    const token = getToken();

    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  // Convertir queryParams si el endpoint es por query
  const queryString = queryParams ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}` : "";

  const requestUrl: string = `${url}${queryString}`;

  // Configurar la petición
  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders
  };

  // cuando NO se hace JSON.stringify el backend de NestJS da error
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

    const response: Response = await fetch(requestUrl, fetchOptions);

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorized();
        errorLogs({
          message: "error 401 no tiene autorizacion para realizar esta accion",
        })
      } else {
        errorLogs({
          message: "error al ejecutar la petición HTTP",
        })
      }

      errorLogs({
        method,
        url,
        options,
        response
      })

      throw new Error("");
    }

    if (responseType === "json") {
      return (await response.json()) as T;
    } else if (responseType === "text") {
      return (await response.text()) as T;
    } else if (responseType === "blob") {
      return (await response.blob()) as T;
    } else {
      errorLogs({
        message: "formato de respuesta no valido",
        method,
        url,
        options,
        response
      })
      throw new Error("");
    }
}
