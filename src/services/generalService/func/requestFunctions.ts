/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import errorNotification from "@/components/dialog/notification/errorNotification";
import { nameCookieKey } from "@/types/constant/const-cookie-storage";
import { constPath } from "@/types/constant/const-path";
import { isUseClient } from "@/utils/func/general";
import { literalObjectLength } from "@/utils/func/dataType";
import { redirect } from "next/navigation";
import { IObjectLogs, IResponse } from "@/services/generalService/types/requestDataTypes";
import { getCookie } from "cookies-next";
import { isFile } from "@/utils/func/dataType";

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

  const { message, method, url, options, result, response } = objectLogs;

  if (isUseClient()) {
    console.error("\n❌ error en el CLIENTE 'use client'");
  } else {
    console.error("\n❌ error en el SERVIDOR 'use server'");
  }

  if (message) console.error("❌ error ", message);
  if (method) console.error("metodo HTTP", method);
  if (url) console.error("url ", url);
  if (process.env.NEXT_PUBLIC_ENVIRONMENT)
    console.error(
      `las variables de entorno estan apuntando al ambiente de ➡️ ${process.env.NEXT_PUBLIC_ENVIRONMENT} ⬅️`
    );

  if (result || response) {
    console.error("respuesta de la API");
  }

  // imprimir respuesta de la api de NestJS
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

  const { method, url, options, result } = objectLogs;

  console.info("\n", "✅ ", "[", method, "]", url);

  if (isFile(options?.body)) {
    console.info("✅ archivo(s) subido(s)");
  }

  if (options?.body) {
    console.info("body ", options?.body);
  }

  if (result) {
    let { success, status, message, data } = result;

    if (data) {
      if (Array.isArray(data)) {
        if (data.length === 0) {
          data = "array vacío ➡️ (0) []";
        } else {
          // data es un array de objetos [{}]
          const areAllObjects: boolean = data?.every(
            (item) => typeof item === "object" && item && item !== null
          );
          if (areAllObjects) {
            data = `array de objetos con ${data.length} elemento ➡️ (${data.length}) [{}]`;
          } else {
            // data es un array []
            data = `array de ${data.length} elementos ➡️ (${data.length}) []`;
          }
        }
      }

      // data es un objeto literal {}
      else if (
        Object.getPrototypeOf(data) === Object.prototype ||
        Object.prototype.toString.call(data) === "[object Object]"
      ) {
        const length: number | null = literalObjectLength(data)

        if (length === 0) {
          data = "objeto literal vacío ➡️ (0) {}";
        } else {
          data = `objeto literal con ${length} keys ➡️ (${length}) {}`;
        }
      }
    }

    const objectSuccesResponse: IResponse = {
      success,
      status,
      message,
      data,
    };

    if (isUseClient()) {
      console.info("componente CLIENTE 'use client'");
    } else {
      console.info("componente SERVIDOR 'use server'");
    }

    console.info(
      `respuesta de la API apuntando a ➡️ ${process.env.NEXT_PUBLIC_ENVIRONMENT} ⬅️ \n`,
      objectSuccesResponse
    );
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
      "❌ httpRequest.ts - Error 401: unauthenticated",
      "\nDetalle: El usuario no está autenticado o la sesión ha expirado",
      "\nAcción: Re-dirigir al usuario a la página de inicio de sesión",
      "\nURL solicitada: ",
      url
    );

    // re-dirigir a /iniciar-sesion cuando el status de la respuesta de la api sea 401
    handleUnauthorized();

    if (isUseClient() && !pathnameIsLogin()) {
      errorNotification("Inicie sesión para continuar");
    }
  } else if (status === 403) {
    console.error(
      "❌ httpRequest.ts - Error 403: Forbidden",
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
      `❌ httpRequest.ts - error 404: Not Found - endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`
    );

    if (isUseClient()) {
      errorNotification(
        "Ha ocurrido un error, por favor comuniquese con el administrador del sistema"
      );
    }
  } else if (status >= 500) {
    console.error(`❌ httpRequest.ts - error en el servidor en la URL ${url}`);

    if (isUseClient()) {
      errorNotification(
        "Ha ocurrido un error, intentalo de nuevo mas tarde, estamos trabajando para solucionarlo"
      );
    }
  }
}
