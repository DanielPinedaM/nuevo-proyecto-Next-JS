/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* **********************************************
 * funciones relacionadas con los tipos de datos *
 * ***********************************************/

/**
admite cualquier string */
export const isString = (variable: string | any): boolean => {
  return typeof variable === 'string' || variable instanceof String;
};

/**
string q contiene numero,
admite numero decimal, comas, numero entero, positivo y negativo.
Ejemplo: "-1,2.1", "-2", "3" */
export const isStringNumber = (variable: string | any): boolean => {
  return typeof variable === 'string' && /^(-?\d{0,}(\,|\.)?){0,}$/.test(variable.trim());
};

/**
true cuando el texto contiene cualquier tipo de letra */
export const isLetter = (variable: string | any): boolean => {
  return typeof variable === 'string' && /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/.test(variable.trim());
};

/**
solamente tipo NUMERO, NO admite NaN */
export const isNumber = (variable: number | any): boolean => {
  return typeof variable === 'number' && Number.isNaN(variable) === false;
};

/**
* Normalizar string
* Ejemplo:
* ' COMunicaciÓN    ' devuelve  'comunicacion'
* [1, 2, 3]           devuelve   [1, 2, 3]
* 
* @param {string|any} string — valor a normalizar. Si no es string o está vacío, se devuelve tal cual
* @param {Object} [options] — opciones de normalización
* @param {boolean} [options.clearSpecialCharacters] — true = BORRAR caracteres especiales,  false = CONSERVAR caracteres especiales
* @param {boolean} [options.enyeWithN] — true = REEMPLAZAR "ñ" y "Ñ" por "n", false = CONSERVAR letra "ñ"
* @param {boolean} [options.clearNumbers] — true = BORRAR numeros, false = CONSERVAR numeros
* @param {boolean} [options.upperCase] — true = convertir texto a MAYUSCULA, false = convertir texto a minuscula
* @returns {string|any} — la cadena normalizada o el valor original si no es string */
export const normalizeStr = (
  string: string | any,
  options?: { clearSpecialCharacters?: boolean; enyeWithN?: boolean; clearNumbers?: boolean, upperCase?: boolean }
): string | any => {
  if (!isString(string)) return string;
  if (String(string).trim() === '') return '';

     const {
        clearSpecialCharacters = false,
        enyeWithN = false,
        clearNumbers = false,
        upperCase = false
     } = options ?? {};

     let newString: string = string.toLowerCase()                                    // convertir a minuscula
                                   .normalize("NFD")                                 // hacer q funcionen las expresiones regulares
                                   .replaceAll(/[\u0300-\u0302\u0304-\u036f]/g, "")  // eliminar acentos (todos menos U+0303)
                                   .normalize("NFC")                                 // conservar la "ñ" "Ñ"
                                   

      if (enyeWithN) {
        newString = newString.replaceAll(/ñ/g, 'n');                                 // reemplazar ñ minúscula por n
      }

      if (clearSpecialCharacters) {
        newString = newString.replaceAll(/[^a-zA-Z0-9 ñÑ]/g, '');                    // borrar caracteres especiales
      }

      if (clearNumbers) {
       newString = newString.replaceAll(/\d+/g, '');                                 // borrar todos los numeros 0123456789
      }
      
      // esto TIENE q estar al final de la funcion
      if (upperCase) {
        newString = newString.toLocaleUpperCase("es-ES");
      }

      newString = newString.trim()                                                   // borrar espacio en blanco al principio y final
                           .replaceAll(/\s+/g, ' ')                                  // reemplazar múltiples espacios en blanco '   ' por un solo espacio en blanco ' ';
      
      return newString;
};

/**
SI es posible convierte a NUMERO,
cuando NO es posible devuleve null */
export const convertToNumber = (number: number | any): number | null => {
  if (isNumber(number)) return number as number;

  if (isStringNumber(number)) {
    const removeCommas: string = number.trim().replaceAll(',', '.');
    return Number(removeCommas);
  }

  if (isString(number) && String(number)?.trim() !== '') return number;

  return null;
};

/**
SI es posible
1) convertir a string
2) pasar string a minuscula

cuando NO es posible devuleve null */
export const convertToStringAndLowerCase = (string: string | any): string | null | any => {
  if (String(string).trim() === '' || !string) {
    return null;
  }

  if (isString(string)) {
    return String(string).trim().toLowerCase();
  }

  return null;
};

export const isBoolean = (variable: boolean | string | any): boolean => {
  const normalized: string = String(variable)?.trim()?.toLowerCase();

  if (
    // true
    normalized === 'true' ||
    normalized === '1' ||
    normalizeStr(variable) === 'si' ||
    normalizeStr(variable) === 'yes' ||
    // false
    normalized === 'false' ||
    normalized === '0' ||
    normalizeStr(variable) === 'no'
  ) {
    return true;
  }

  return false;
};

/**
SI es posible
convertir a booleano
cuando NO es posible devuleve null */
export const convertToBoolean = (variable: boolean | string | any): boolean | null => {
  const normalized: string = String(variable)?.trim()?.toLowerCase();

  if (
    normalized === 'true' ||
    normalized === '1' ||
    normalizeStr(variable) === 'si' ||
    normalizeStr(variable) === 'yes'
  ) {
    return true;
  } else if (normalized === 'false' || normalized === '0' || normalizeStr(variable) === 'no') {
    return false;
  } else {
    return null;
  }
};

/**
saber si puedo o no convertir de string a array u objeto con JSON.parse() */
export const isValidJSONparse = (string: string): boolean => {
  if (typeof string !== 'string') return false;

  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
};

/**
¿El parametro variable es un archivo? */
export function isFile(variable: any): boolean {
  return (
    variable instanceof FormData ||
    variable instanceof Blob ||
    variable instanceof File ||
    variable instanceof ArrayBuffer
  );
}

/**
longitud de un objeto literal

>= 0 cuando SI es objeto literal
-1   cuando NO es objeto literal */
export const literalObjectLength = (literalObject: any): number => {
  if (isLiteralObject(literalObject)) {
    const length: number =
      Object.keys(literalObject).length + Object.getOwnPropertySymbols(literalObject).length;
    return length;
  }

  return -1;
};

/**
convertir los tipos de datos
de los values de un objeto literal {} NO anidado (de UNA SOLA dimension) */
export const convertFlatObjectValues = (obj: Record<string, any>): Record<string, string> => {
  return Object.entries(obj).reduce((newObject, [key, value]) => {
    const normalized: string = String(key)?.trim()?.toLowerCase();

    if (normalized === 'undefined') {
      newObject[key] = undefined;
    } else if (normalized === 'null') {
      newObject[key] = null;
    } else if (Number.isNaN(key) || normalized === 'nan') {
      newObject[key] = NaN;
    } else if (isNumber(value) || isStringNumber(value)) {
      newObject[key] = convertToNumber(value);
    } else if (isBoolean(value)) {
      newObject[key] = convertToBoolean(value);
    } else {
      newObject[key] = value;
    }

    return newObject;
  }, {} as Record<string, any>);
};

/**
¿la variable es un objeto literal? */
export const isLiteralObject = (literalObject: any): boolean =>
  typeof literalObject === 'object' &&
  literalObject !== null &&
  (Object.getPrototypeOf(literalObject) === Object.prototype ||
    Object.prototype.toString.call(literalObject) === '[object Object]');

/**
convertir a JSON.stringify() SI ES POSIBLE */
export const convertToStringify = (value: any | string): any | string => {
  // solamente se puede hacer JSON.stringify() de un
  // 1) array []
  if (Array.isArray(value)) return JSON.stringify(value);

  // 2) objeto literal {}
  if (isLiteralObject(value)) return JSON.stringify(value);

  return value;
};

/**
convertir a JSON.stringify() SI ES POSIBLE,
sino, convierte a string */
export const forceConvertToString = (value: any | string): string => {
  // solamente se puede hacer JSON.stringify() de un
  // 1) array []
  if (Array.isArray(value)) return JSON.stringify(value);

  // 2) objeto literal {}
  if (isLiteralObject(value)) return JSON.stringify(value);

  return String(value).trim();
};
