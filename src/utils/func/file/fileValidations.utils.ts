"use client";
import errorNotification from "@/components/dialog/notification/errorNotification";
import { ISendId } from "@/models/interfaces/upload-file.interfaces";
import { IValidateMultipleFiles, IValidateSingleFile } from "@/models/interfaces/validate-file.interfaces";
import { listFormat } from "@/utils/func/general.utils";
import { FileWithPath } from "react-dropzone";

/* ***********************
* validacion de archivos *
* ************************ */

/**
Peso maximo de los archivos en bytes */
const maxSizeBytes: number = 1000000000;

/**
validar el ID:
en una peticion HTTP cuando el ID se envia por URL params
NO se necesita el nombre de la columna ID en base de datos (nameId),
pero cuando se envia el ID por body SI se necesita el nameId */
 export const validateId = (sendId: ISendId | undefined): boolean => {
    // NO validar ID cuando NO se envia el parametro sendId
    // es opcional enviar el ID asociado al archivo
    if (!sendId) return false;

    const { id, sendBy, nameId } = sendId;

    const message: string = "Ha ocurrido un error, por favor comuniquese con el administrador del sistema";

    if (sendBy === "body" && !id) {
      console.error("❌ para subir archivo(s) y enviar el ID por BODY, el ID NO puede ser falsy", "\n", "id ", id, "\n", "sendBy ", sendBy, "\n", "nameId ", nameId);
      errorNotification(message);
      return true;
    }

    if (sendBy === "body" && !nameId) {
      console.error("❌ para subir archivo(s) y enviar el ID por BODY es necesario el nameId que es el nombre de la columna ID en base de datos (NestJS)", "\n", "id ", id, "\n", "sendBy ", sendBy, "\n", "nameId ", nameId);
      errorNotification(message);
      return true;
    }

    if (sendBy === "params" && !id) {
      console.error("❌ para subir archivo(s) y enviar el ID por URL PARAMS, el ID NO puede ser falsy", "\n", "id ", id, "\n", "sendBy ", sendBy, "\n", "nameId ", nameId);
      errorNotification(message);
      return true;
    }

    return false;
  };

/**
funcion q valida q se suba UN SOLO archivo */
export const validateSingleFile = ({
    files,             // NUEVOS archivos q el usuario esta INTENTANDO cargar
    previousFileName,  // NOMBRE del archivo subido ANTERIORMENTE
    allowedExtensions, // array tipo string con EXTENSIONES PERMITIDAS
  }: IValidateSingleFile): boolean => {
    // validar subir UN SOLO archivo
    if (files?.length === 0) {
      errorNotification("Suba un archivo");
      return true;
    }
    if (files && files?.length > 1) {
      errorNotification("Solo se puede subir un archivo");
      return true;
    }

    // validar NO subir archivo vacios (q pesen 0)
    if (files && files[0]?.size === 0) {
      errorNotification("No se pueden subir archivos vacíos");
      return true;
    }

    // validar NO subir archivo q pese mas de 1 GB
    if (files && files[0]?.size > maxSizeBytes) {
      errorNotification(`No se pueden subir archivos que pesen más de ${maxSizeBytes / 1000000000} GB`);
      return true;
    }

    // NO permitir subir archivos duplicados
    const newFileName: string = files[0]?.name;

    if (previousFileName && newFileName && previousFileName?.trim() === newFileName?.trim()) {
      errorNotification(`No se puede subir el mismo archivo ${files[0]?.name}`);
      return true;
    }

    // Validar extension de UN SOLO archivo
    const extension: string | undefined = files[0]?.name?.split(".")?.at(-1);
    if (extension) {
      if (allowedExtensions && !allowedExtensions?.includes(extension)) {
        errorNotification(
          `Extensión de archivo inválida, solo se admite ${listFormat(allowedExtensions)}`
        );
        return true;
      }
    }

    return false;
  };

/**
funcion q valida q se suba UNO O MAS archivos */
export const validateMultipleFiles = ({
    files,             // NUEVOS archivos q el usuario esta INTENTANDO cargar
    previousFiles,     // archivos "VIEJOS" q el usuario ya cargo y pasaron todas las validaciones
    acceptedFiles,     // estos son los archivos q se SUBEN AL SERVIDOR
    allowedExtensions, // array tipo string con EXTENSIONES PERMITIDAS
  }: IValidateMultipleFiles): boolean => {
    // validar subir UNO O MAS archivos
    if (files.length === 0) {
      errorNotification("Debe subir como mínimo un archivo");
      return true;
    }

    // validar NO subir archivo vacios (q pesen 0)
    const emptyFile: boolean = files.some((file: FileWithPath) => file.size === 0);
    if (emptyFile) {
      errorNotification("No se pueden subir archivos vacíos");
      return true;
    }

    // validar NO subir archivo q pese mas de 1 GB
    const exceedsMaximumWeight: boolean = files.some((file: FileWithPath) => file.size > maxSizeBytes);
    if (exceedsMaximumWeight) {
      errorNotification(`No se pueden subir archivos que pesen más de ${maxSizeBytes / 1000000000} GB`);
      return true;
    }

    // NO permitir subir archivos duplicados
    const duplicateError: boolean = files.some((file: FileWithPath) =>
      [...(previousFiles ?? []), ...(acceptedFiles ?? [])].some(
        (existingFile: FileWithPath) => existingFile?.name === file?.name
      )
    );
    if (duplicateError) {
      errorNotification("No se pueden subir archivos con el mismo nombre");
      return true;
    }

    // Validar extensiones de TODOS los archivos
    if (allowedExtensions) {
      const extensionError: boolean = files.some((file: FileWithPath) => {
        const fileExtension = file?.name?.split(".")?.at(-1);
        return !allowedExtensions.includes(fileExtension ?? "");
      });

      if (extensionError) {
        errorNotification(
          `Extensión de archivo inválida, solo se admite ${listFormat(allowedExtensions)}`
        );
        return true;
      }
    }

    return false;
  };