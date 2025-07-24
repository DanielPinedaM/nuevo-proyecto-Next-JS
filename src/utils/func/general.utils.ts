/* eslint-disable @typescript-eslint/no-explicit-any */
import errorNotification from '@/components/dialog/notification/errorNotification';
import successNotification from '@/components/dialog/notification/successNotification';
import specialWords from '@/models/constants/special-words.constants';

/**
prime NG - calcular paginador y numero de filas q se muestran en <table>
el algoritmo funciona mejor si rows es multiplo de 3, pero puede ser cualquier numero */
export const rowsPerPageOptions = (length: number = 0, rows: number = 0): number[] => {
  if (typeof length !== 'number') {
    console.error(
      'para calcular el numero de filas del paginador de prime NG la el parametro de la longitud length del array debe ser tipo number',
      typeof length
    );
    return [];
  }

  if (length === 0) return [];
  if (rows === 0) return [];

  // longitud de la data <= numero inicial de filas q se muestran
  if (length <= rows) return [];

  let opciones: number[] = [];

  // length SI es multiplo de 3
  if (length % 3 === 0) {
    opciones = [rows, length / 3, (length / 3) * 2, length];

    // length NO es multiplo de 3
  } else {
    // redondear hacia abajo (longitud de la data / 3)
    const third = Math.floor(length / 3);

    // numero inicial de filas q se muestran
    opciones.push(rows);
    opciones.push(third);
    opciones.push(third * 2);
    // longitud de la data
    opciones.push(length);
  }

  // numero paginas cumple estas condiciones:
  // 1) >= numero inicial de filas q se muestran
  // 2) <= longitud de la data q se muestra en la tabla
  // 3) ...new Set todos los numeros de pagina tienen q ser unicos
  // 4) ordenar ascendente (de menor a mayor)
  return [...new Set(opciones.filter((option: number) => option >= rows && option <= length))].sort(
    (a, b) => a - b
  );
};

/**
Separar array por comas
Ejemplo: [1, 2, 3] devuelve 1, 2 y 3 */
export const listFormat = (array: any[]): string => {
  const arrayString: string[] = array.map((item) => String(item));
  return new Intl.ListFormat('es').format(arrayString);
};

/**
recortar un string a un tamaño de caracteres máximo, agregando "..." si excede la longitud especificada */
export const truncateString = (string: string | any, maxLength: number): string | any => {
  if (typeof string === 'string' && string.length > maxLength) {
    return string.slice(0, maxLength) + '...';
  }

  return string;
};

/**
hacer q los string tengan mayuscula inicial */
export const titleCase = (string: string | any): string | any => {
  if (typeof string !== 'string') return string;
  if (string.trim() === '') return string;

  return string
    .replaceAll('-', ' ')
    .replace(/\w\S*/g, (word: string): string => {
      const lowerCase = word.trim().toLocaleLowerCase();

      if (specialWords[lowerCase]) return specialWords[lowerCase];

      if (word.length <= 3) return word.toLowerCase();

      // agrear esto aqui .replaceAll("-", " ") y  conservar el title case
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    })
    .trim();
};

/**
Concatenar los string de un array
Ejemplo:
["esteban", "", "bolaños", "gomes"] devuelve "Esteban Bolaños Gomes" */
export const concatenateArrayString = (arrayString: (string | null)[]): string | any => {
  if (Array.isArray(arrayString)) {
    const concatenatedString = arrayString.filter(Boolean).join(' ');
    return titleCase(concatenatedString);
  }

  return arrayString;
};

/**
el codigo se ejecuta en el servidor o cliente */
export const isUseClient = (): boolean => {
  // 'use client' - cliente - CSR - frontend
  if (typeof window !== 'undefined') {
    return true;
  } else {
    // 'use server' - servidor - SSR - backend
    return false;
  }
};

/**
copiar texto en portapapeles */
export const copyText = async (text: string): Promise<void> => {
  const errorMessage: string = 'No se pudo copiar el texto';

  if (!isUseClient()) {
    console.error("❌ error, solamente se puede copiar texto en componente cliente 'use client'");
    return;
  }

  if (!text) {
    console.error('❌ error, el texto a copiar NO puede ser falsy \n', text);
    return;
  }

  if (!navigator?.clipboard?.writeText) {
    errorNotification(errorMessage);
    console.error(
      errorMessage,
      ' porque el navegador no es compatible con navigator?.clipboard?.writeText'
    );
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    successNotification('Texto copiado');
  } catch (e) {
    errorNotification(errorMessage);
    console.error(errorMessage, '\n', e);
  }
};
