import { IUrl } from "@/models/interfaces/upload-file.interfaces";
import { GET, POST, PUT, PATCH, DELETE } from "@/services/general-service/http.service";
import { IResponse } from "@/services/general-service/types/request-data.types";
import { isFile } from "@/utils/func/dataType.utils";

/* ********************************************
 * endpoints para subir UN SOLO Ó MAS archivos *
 * ********************************************* */

const message: string = "❌ error NO se esta enviando un formData para subir archivo(s) ";

const ERROR_FILE_OBJECT: IResponse = {
  success: false,
  status: 400,
  message: "se requiere archivo",
  data: [],
};

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

    return ERROR_FILE_OBJECT;
  }

  const { env, route, method } = url;

  let response: IResponse | any = null;

  if (method === "GET") {
    response = await GET(`${env}${route}`, {
      body: file,
    });
  } else if (method === "POST") {
    response = await POST(`${env}${route}`, {
      body: file,
    });
  } else if (method === "PUT") {
    response = await PUT(`${env}${route}`, {
      body: file,
    });
  } else if (method === "PATCH") {
    response = await PATCH(`${env}${route}`, {
      body: file,
    });
  } else if (method === "DELETE") {
    response = await DELETE(`${env}${route}`, {
      body: file,
    });
  }

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
    return ERROR_FILE_OBJECT;
  }

  const { env, route, method } = url;

  let response: IResponse | any = null;

  if (method === "GET") {
    response = await GET(`${env}${route}`, {
      body: file,
    });
  } else if (method === "POST") {
    response = await POST(`${env}${route}`, {
      body: file,
    });
  } else if (method === "PUT") {
    response = await PUT(`${env}${route}`, {
      body: file,
    });
  } else if (method === "PATCH") {
    response = await PATCH(`${env}${route}`, {
      body: file,
    });
  } else if (method === "DELETE") {
    response = await DELETE(`${env}${route}`, {
      body: file,
    });
  }

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
    return ERROR_FILE_OBJECT;
  }

  const { env, route, method } = url;

  let response: IResponse | any = null;

  if (method === "GET") {
    response = await GET(`${env}${route}/${paramsId}`, {
      body: file,
    });
  } else if (method === "POST") {
    response = await POST(`${env}${route}/${paramsId}`, {
      body: file,
    });
  } else if (method === "PUT") {
    response = await PUT(`${env}${route}/${paramsId}`, {
      body: file,
    });
  } else if (method === "PATCH") {
    response = await PATCH(`${env}${route}/${paramsId}`, {
      body: file,
    });
  } else if (method === "DELETE") {
    response = await DELETE(`${env}${route}/${paramsId}`, {
      body: file,
    });
  }

  return response;
}
