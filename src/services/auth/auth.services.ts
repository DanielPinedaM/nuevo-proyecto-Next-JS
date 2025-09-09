import { POST } from "@/services/general-service/http.service";
import { IResponse } from "@/services/general-service/types/request-data.types";

/**
de-codificar el token EN EL SERVIDOR 'use server' */
export async function decodeTokenInServer(): Promise<IResponse> {
  const response: IResponse = await POST(`${process.env.NEXT_PUBLIC_API}auth/profile`);

  return response;
}

/**
listar las URL del menu */
export async function listUrl(): Promise<IResponse> {
  const response: IResponse = await POST(`${process.env.NEXT_PUBLIC_API}auth/list-url`);

  return response;
}
