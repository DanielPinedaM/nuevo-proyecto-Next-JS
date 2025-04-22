/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { saveAs } from 'file-saver';
import { currentDateAndTime } from '@/utils/func/luxon';
import errorNotification from '@/components/dialog/notification/errorNotification';
import { isUseClient, titleCase } from '@/utils/func/general';
import successNotification from '@/components/dialog/notification/successNotification';
import { IResponse } from '@/services/generalService/types/requestDataTypes';
import * as ExcelJS from 'exceljs';
import { ILoaderState } from '@/store/loaderStore';

/**
Funcion para descargar archivo */
export const downloadBlob = (blob: Blob | IResponse, fileName: string | undefined): void => {
  if (!isUseClient()) {
    console.error("❌ error, no se puede descargar archivo en un componente servidor 'use server'");
    return;
  }

  const message: string = 'Ocurrió un error al descargar archivo';
  if (!(blob instanceof Blob)) {
    console.error(
      '❌ error, no se puede descargar archivo ',
      fileName,
      'porque no hay un blob ',
      blob
    );

    errorNotification(message);
    return;
  }

  const extension: string | undefined = fileName?.split('.')?.at(-1);
  if (!fileName || !fileName?.includes('.') || !extension) {
    console.error(
      '❌ error, no se puede descargar archivo ',
      fileName,
      'porque se necesita el nombre de la extension ',
      extension
    );

    errorNotification(message);
    return;
  }

  const lastDotIndex: number = fileName.lastIndexOf('.');
  const baseFileName: string = lastDotIndex > -1 ? fileName.slice(0, lastDotIndex) : fileName;
  const date: string = currentDateAndTime().replaceAll(':', '_').replaceAll(' ', '-');

  successNotification(`Archivo descargado ${baseFileName}.${extension}`);

  saveAs(blob, `${date}-${baseFileName}.${extension}`);
};

/**
Funcion para ver archivo */
export const viewBlob = (blob: Blob | IResponse): void => {
  if (blob instanceof Blob) {
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');

    setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
  } else {
    errorNotification("Al ver archivo");
    console.error('❌ error, para poder ver el archivo, tiene q ser tipo blob\n', blob);
  }
};

/**
descargar Excel a partir de un array de objetos NO anidado */
export const downloadExcel = async (
  nonNestedArrayOfObjects: Array<Record<string, any>>,
  fileName: string
): Promise<void> => {
  if (!isUseClient()) {
    console.error("❌ error, no se puede descargar Excel en un componente servidor 'use server'");
    return;
  }

  const message: string = 'Ocurrió un error al descargar Excel';

  if (!nonNestedArrayOfObjects || nonNestedArrayOfObjects?.length === 0) {
    errorNotification(message);
    console.error(
      '❌ el array de objetos NO puede estar vacio, NI puede ser falsy\n',
      nonNestedArrayOfObjects
    );
    return;
  }

  if (!String(fileName)?.includes('.xlsx')) {
    errorNotification(message);
    console.error('❌ fileName tiene q contener la extension .xlsx\n', fileName);
    return;
  }

  // loader global q se muestra y oculta en componentes cliente 'use client'
  let loaderStore: ILoaderState | null = null;

  // acceder al valor booleano del loader
  const { useLoaderStore } = await import('@/store/loaderStore');
  loaderStore = useLoaderStore.getState();
  loaderStore.showLoader();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos');
  const keys: string[] = Object.keys(nonNestedArrayOfObjects[0]);

  // Mayusculas iniciales a los nombres de las columnas del Excel
  const header: string[] = keys.map((key) => titleCase(key));

  // Agregar encabezados con estilos
  worksheet.addRow(header);
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4F81BD' }, // Color azul
    };
    cell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Texto blanco
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // Agregar datos a la tabla
  nonNestedArrayOfObjects.forEach((obj) => {
    worksheet.addRow(Object.values(obj));
  });

  // Ajustar el ancho de las columnas automáticamente
  worksheet.columns.forEach((column) => {
    column.width = 15;
  });

  // Aplicar autofiltro a los datos
  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: worksheet.rowCount, column: keys.length },
  };

  workbook.xlsx
    .writeBuffer()
    .then((excelBuffer) => {
      downloadBlob(new Blob([excelBuffer]), fileName);
    })
    .catch((error) => {
      console.error('❌ error al generar el archivo Excel\n', error);
      errorNotification(message);
    })
    .finally(() => {
      loaderStore.hideLoader();
    });
};
