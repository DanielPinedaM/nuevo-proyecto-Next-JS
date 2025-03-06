import { FileWithPath } from "react-dropzone";

/* ************************************************************
* tipos de datos para las funciones que validan los archivos *
* ************************************************************ */

/**
UN SOLO archivo */
export interface IValidateSingleFile {
  files: FileWithPath[];
  previousFileName?: string;
  allowedExtensions?: string[];
}

/**
UNO O MAS archivos */
export interface IValidateMultipleFiles {
  files: FileWithPath[];
  acceptedFiles?: FileWithPath[];
  previousFiles?: FileWithPath[];
  allowedExtensions?: string[];
}
