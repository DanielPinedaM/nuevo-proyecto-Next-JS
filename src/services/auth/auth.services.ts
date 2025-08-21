import { httpService } from "@/services/generalService/http.service";
import { IRequestOptions, IResponse } from "@/services/generalService/types/request-data.types";

/**
iniciar sesion */
export async function login(optionsApi: IRequestOptions): Promise<IResponse> {
  const response: IResponse = await httpService(
    "POST",
    process.env.NEXT_PUBLIC_AUTH_LOGIN,
    optionsApi
  );

  return response;
}

/**
de-codificar el token EN EL SERVIDOR 'use server' */
export async function decodeTokenInServer(): Promise<IResponse> {
  const response: IResponse = await httpService(
    "POST",
    `${process.env.NEXT_PUBLIC_API}auth/profile`
  );

  return response;
}

/**
listar las URL del menu */
export async function listUrl(): Promise<IResponse> {
  const response: IResponse = await httpService(
    "POST",
    `${process.env.NEXT_PUBLIC_API}auth/list-url`
  );

  return response;
}
