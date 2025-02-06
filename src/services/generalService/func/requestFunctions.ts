/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { nameCookieKey } from "@/types/constant/const-cookie-storage";
import { constPath } from "@/types/constant/const-path";
import { isUseClient } from "@/utils/func/general";
import { redirect } from "next/navigation";
import { IObjectLogs, IResponse } from "../types/requestDataTypes";
import { getCookie } from "cookies-next";

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

      console.log("🚀 ~ getToken ~ token:", token);
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

// ¿se esta subiendo archivo(s)?
export function uploadFile(body: any): boolean {
  return body instanceof FormData;
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
    const pathname: string = window.location.pathname;

    if (pathname !== login) {
      window.location.href = login;
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
  //if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") return;

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

  if (uploadFile(options?.body)) {
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
          const areAllObjects: boolean = data.every(
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
        const objectLength: number =
          Object.keys(data).length + Object.getOwnPropertySymbols(data).length;

        if (objectLength === 0) {
          data = "objeto literal vacío ➡️ (0) {}";
        } else {
          data = `objeto literal con ${objectLength} keys ➡️ (${objectLength}) {}`;
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
