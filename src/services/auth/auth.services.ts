import IFormLogin from '@/models/interfaces/login.interfaces';
import { httpService } from '@/services/generalService/http.service';
import { IResponse } from '@/services/generalService/types/request-data.types';

/**
iniciar sesion */
export async function login(body: IFormLogin): Promise<IResponse> {
  const response: IResponse = await httpService('POST', process.env.NEXT_PUBLIC_AUTH_LOGIN, {
    body,
  });

  return response;
}

/**
de-codificar el token EN EL SERVIDOR 'use server' */
export async function decodeTokenInServer(): Promise<IResponse> {
  const response: IResponse = await httpService(
    'POST',
    `${process.env.NEXT_PUBLIC_API}auth/profile`
  );

  return response;
}

/**
listar las URL del menu */
export async function listUrl(): Promise<IResponse> {
  const response: IResponse = await httpService(
    'POST',
    `${process.env.NEXT_PUBLIC_API}auth/list-url`
  );

  return response;
}
