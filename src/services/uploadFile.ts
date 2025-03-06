import { httpRequest } from "@/services/generalService/httpRequest";
import { IResponse } from "@/services/generalService/types/requestDataTypes";
import { IUrl } from "@/types/interface/interface-upload-file";
import { isFile } from "@/utils/func/dataType";

/* ********************************************
 * endpoints para subir UN SOLO Ó MAS archivos *
 * ********************************************* */

const message: string = "❌ error NO se esta enviando un formData para subir archivo(s) ";

/**
interface que sirve para
- enviar ID por BODY
- NO enviar ID */
interface IUploadOneOrMoreFiles {
  file: FormData;
  url: IUrl;
}

/**
enviar ID por BODY */
export async function uploadOneOrMoreFilesByBody({
  file,
  url,
}: IUploadOneOrMoreFiles): Promise<IResponse> {
  if (!isFile(file)) {
    console.error("uploadOneOrMoreFilesByBody ", message, "\nfile ", file);
    throw new Error("");
  }

  const { env, route, method } = url;

  const response: IResponse = await httpRequest(method, `${env}${route}`, {
    body: file,
  });

  return response;
}

/**
NO enviar ID */
export async function uploadOneOrMoreFilesWithoutId({
  file,
  url,
}: IUploadOneOrMoreFiles): Promise<IResponse> {
  if (!isFile(file)) {
    console.error("uploadOneOrMoreFilesWithoutId ", message, "\nfile ", file);
    throw new Error("");
  }

  const { env, route, method } = url;

  const response: IResponse = await httpRequest(method, `${env}${route}`, {
    body: file,
  });

  return response;
}

/**
enviar ID por PARAMS URL */
interface IUploadOneOrMoreFilesByParams {
  file: FormData;
  paramsId: string | number;
  url: IUrl;
}
export async function uploadOneOrMoreFilesByParams({
  file,
  paramsId,
  url,
}: IUploadOneOrMoreFilesByParams): Promise<IResponse> {
  if (!isFile(file)) {
    console.error("uploadOneOrMoreFilesByParams ", message, "\nfile ", file);
    throw new Error("");
  }

  const { env, route, method } = url;

  const response: IResponse = await httpRequest(method, `${env}${route}/${paramsId}`, {
    body: file,
  });

  return response;
}
