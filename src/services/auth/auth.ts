import { httpRequest } from '@/services/generalService/httpRequest';
import { IResponse } from '@/services/generalService/types/requestDataTypes';
import IFormLogin from '@/types/interface/interface-login';

/**
peticion para iniciar sesion */
export async function login(body: IFormLogin): Promise<IResponse> {
  const response: IResponse = await httpRequest('POST', process.env.NEXT_PUBLIC_AUTH_LOGIN, {
    body,
  });

  return response;
}

/**
peticion para de-codificar el token EN EL SERVIDOR 'use server' */
export async function decodeTokenInServer(): Promise<IResponse> {
  const response: IResponse = await httpRequest(
    'POST',
    `${process.env.NEXT_PUBLIC_API}auth/profile`
  );

  return response;
}
