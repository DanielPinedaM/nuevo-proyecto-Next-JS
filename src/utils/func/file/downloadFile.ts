/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { saveAs } from "file-saver";
import { currentDateAndTime } from "@/utils/func/luxon";
import errorNotification from "@/components/dialog/notification/errorNotification";
import { isUseClient, titleCase } from "@/utils/func/general";
import successNotification from "@/components/dialog/notification/successNotification";
import { IResponse } from "@/services/generalService/types/requestDataTypes";
import * as xlsx from "xlsx";

/**
Funcion para descargar archivo */
export const downloadBlob = (blob: Blob | IResponse, fileName: string | undefined): void => {
  if (!isUseClient()) {
    console.error(
      "❌ error, no se puede descargar archivo en un componenete servidor 'use server'"
    );
    return;
  }

  const message: string = "Ocurrió un error al descargar archivo";
  if (!(blob instanceof Blob)) {
    console.error(
      "❌ error, no se puede descargar archivo ",
      fileName,
      "porque no hay un blob ",
      blob
    );

    errorNotification(message);
    return;
  }

  const extension: string | undefined = fileName?.split(".")?.at(-1);
  if (!fileName || !fileName?.includes(".") || !extension) {
    console.error(
      "❌ error, no se puede descargar archivo ",
      fileName,
      "porque se necesita el nombre de la extension ",
      extension
    );

    errorNotification(message);
    return;
  }

  const lastDotIndex: number = fileName.lastIndexOf(".");
  const baseFileName: string = lastDotIndex > -1 ? fileName.slice(0, lastDotIndex) : fileName;
  const date: string = currentDateAndTime().replaceAll(":", "_").replaceAll(" ", "-");

  successNotification(`Archivo descargado ${baseFileName}.${extension}`);

  saveAs(blob, `${date}-${baseFileName}.${extension}`);
};

/**
Funcion para ver archivo */
export const viewBlob = (blob: Blob | IResponse): void => {
  if (blob instanceof Blob) {
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank");

    setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
  } else {
    console.error("Error al obtener el archivo:", blob);
  }
}

/**
descargar Excel a partir de un array de objetos */
export const downloadExcel = (
  nonNestedArrayOfObjects: Array<Record<string, any>>,
  fileName: string
): void => {
  if (!nonNestedArrayOfObjects || nonNestedArrayOfObjects?.length === 0) {
    errorNotification("Ocurrió un error al descargar Excel")
  }
  if (!(String(fileName)?.includes(".xlsx"))) {
    errorNotification("Ocurrió un error al descargar Excel")

    console.error("fileName tiene q contener la extension .xlsx")
  }

  const keys: string[] = Object.keys(nonNestedArrayOfObjects[0]);

  // Transformar cada clave usando getWord para obtener un header más legible
  const header: string[] = keys.map((key) => titleCase(key));

  // Crear la hoja de Excel, indicando el orden de las claves
  const workSheet = xlsx.utils.json_to_sheet(nonNestedArrayOfObjects, { header: keys });

  // Reemplazar la primera fila (encabezados) con los textos obtenidos mediante getWord
  header.forEach((text, index) => {
    const cellRef = xlsx.utils.encode_cell({ r: 0, c: index });

    if (workSheet[cellRef]) {
      workSheet[cellRef].v = text;
    }
  });
  // crear buffer con array de objetos
  const workBook = { Sheets: { data: workSheet }, SheetNames: ["data"] };
  const excelBuffer = xlsx.write(workBook, { bookType: "xlsx", type: "array" });

  downloadBlob(new Blob([excelBuffer]), fileName);
};



export const downloadExcelFromBlob = (blob:any, fileName:any) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName); // Nombre del archivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

