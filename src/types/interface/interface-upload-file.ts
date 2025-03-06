/* eslint-disable @typescript-eslint/no-explicit-any */
import { Method } from "@/services/generalService/types/requestDataTypes";
import { FileWithPath } from "react-dropzone";

export interface IUrl {
  // variable de entorno (env) de la API donde se hace la peticion HTTP
  env: string;

  // ruta donde esta el endpoint
  route: string;

  // metodo HTTP q se usa para consumir el endpoint
  method: Method;
}

export interface ISendId {
  // ID de la fila actual a la q el usuario da click en la tabla
  id: string | number | undefined;

  // decide si enviar el ID en la peticion por body ó params
  sendBy: "body" | "params";

  // Nombre de la columna ID en base de datos (NestJS)
  // - Requerido        si   sendBy === "body"
  // - No debe existir  si   sendBy === "params"
  nameId?: string;
}

/**
props q tiene ventana modal para subir UNO SOLO O MAS archivos */
export interface IUploadFile {
  // *** PROPS NECESARIAS PARA SUBIR ARCHIVO ***
  // opcinal: enviar un ID asociado al archivo q se esta subiendo
  sendId?: ISendId;
  url: IUrl;
  // array de string q valida el tipo de archivos permitidos
  allowedExtensions: string[];
  // abrir otra modal despues de cerrar modal subir archivo
  NestedDialog?: any;

  // *** PROPS NECESARIAS PARA MOSTRAR Y OCULTAR VENTANA MODAL ***
  // tiutlo <h1> de la ventana modal
  title: string;
  // sub-tiutlo <h2> de la ventana modal
  subtitle?: string;
  // booleano q controla si ocultar o mostrar la modal
  visible?: boolean;
  // funcion q setea cuando esta "visible" la modal
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFileUploadButtons {
  // funcion q envia peticion http para subir archivo(s)
  onSubmit?: () => void;

  // funcion para ocultar ventana modal
  onHide: () => void;

  // ¿el usuario esta arrastrando y soltando archivo(s)?
  isDragActive: boolean;
}

/**
tipo de dato de componente que lista los archivos cargados por react-dropzone */
export interface IListFiles {
  // lista de archivos q se listan
  acceptedFile: FileWithPath;

  // eliminar archivo(s) q ha(n) sido subido(s) pero no se ha enviado al servidor
  onClickDeleteFile: (i: number) => void;

  // indice actual del archivo q el usuario elimino al dar click en la 🗑️
  i: number;
}
