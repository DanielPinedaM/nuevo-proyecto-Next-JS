/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST } from "@/services/general-service/http.service";
import { IRequestOptions, IResponse } from "@/services/general-service/types/request-data.types";

/**
listar y buscar data de tabla llamada "nombre-tabla" */
export async function listTableData(search: string): Promise<IResponse> {
  const response: IResponse = await POST(
    `${process.env.NEXT_PUBLIC_}${search ? "/" + search : ""}`
  );

  return response;
}

/**
peticion de ventana modal para guardar nueva tabla */
export async function createTable(optionsApi: IRequestOptions): Promise<IResponse> {
  const response: IResponse = await POST(`${process.env.NEXT_PUBLIC_}`, optionsApi);

  return response;
}

/**
peticion de ventana modal q hace una pregunta */
export async function acceptValidation(): Promise<IResponse> {
  const response: IResponse = await POST(`${process.env.NEXT_PUBLIC_}`);

  return response;
}
