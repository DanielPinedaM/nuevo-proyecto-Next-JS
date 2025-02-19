/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* **********************************************
 * funciones relacionadas con los tipos de datos *
 * ***********************************************/

/**
admite cualquier string */
export const isString = (variable: string | any): boolean => {
  return typeof variable === "string" || variable instanceof String;
};

/**
string q contiene numero,
admite numero decimal, comas, numero entero, positivo y negativo.
Ejemplo: "-1,2.1", "-2", "3" */
export const isStringNumber = (variable: string | any): boolean => {
  return typeof variable === "string" && /^(-?\d{0,}(\,|\.)?){0,}$/.test(variable.trim());
};

/**
true cuando el texto contiene cualquier tipo de letra */
export const isLetter = (variable: string | any): boolean => {
  return typeof variable === "string" && /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/.test(variable.trim());
};

/**
solamente tipo NUMERO, NO admite NaN */
export const isNumber = (variable: number | any): boolean => {
  return typeof variable === "number" && Number.isNaN(variable) === false;
};

/**
Borrar:
- caracteres especiales
- espacio en blanco al principio y final
- convertir a minuscula

Ejemplo:
' COMunicaciÓN    ' devuelve  'comunicacion'
[1, 2, 3]           devuelve   [1, 2, 3] */
export const normalizeStr = (string: string | any): string | any => {
  if (isString(string)) {
    return string
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replaceAll(/[\u0300-\u036f]/g, "");
  }

  return string;
};

/**
SI es posible convierte a NUMERO,
cuando NO es posible devuleve null */
export const convertToNumber = (number: number | any): number | null => {
  if (isNumber(number)) return number as number;

  if (isStringNumber(number)) {
    const removeCommas: string = number.trim().replaceAll(",", ".");
    return Number(removeCommas);
  }

  if (isString(number) && String(number)?.trim() !== "") return number;

  return null;
};

/**
SI es posible
1) convertir a string
2) pasar string a minuscula

cuando NO es posible devuleve null */
export const convertToStringAndLowerCase = (string: string | any): string | null | any => {
  if (String(string).trim() === "" || !string) {
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
    normalized === "true" ||
    normalized === "1" ||
    normalizeStr(variable) === "si" ||
    // false
    normalized === "false" ||
    normalized === "0" ||
    normalizeStr(variable) === "no"
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

  if (normalized === "true" || normalized === "1" || normalizeStr(variable) === "si") {
    return true;
  } else if (normalized === "false" || normalized === "0" || normalizeStr(variable) === "no") {
    return false;
  } else {
    return null;
  }
};

/**
saber si puedo o no convertir de string a array u objeto con JSON.parse() */
export const isValidJSONparse = (string: string): boolean => {
  if (typeof string !== "string") return false;

  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
};

/**
¿se esta subiendo archivo(s)? */
export function isFile(body: Blob | any): boolean {
  return body instanceof FormData;
}

/**
longitud de un objeto literal */
export const literalObjectLength = (literalObject: any): number | null => {
  if (
    Object.getPrototypeOf(literalObject) === Object.prototype ||
    Object.prototype.toString.call(literalObject) === "[object Object]"
  ) {
    const length: number =
      Object.keys(literalObject).length + Object.getOwnPropertySymbols(literalObject).length;
    return length;
  }

  return null;
};

/**
convertir los tipos de datos
de los values de un objeto literal {} NO anidado (de UNA SOLA dimension) */
export const convertFlatObjectValues = (obj: Record<string, any>): Record<string, string> => {
  return Object.entries(obj).reduce((newObject, [key, value]) => {
    const normalized: string = String(key)?.trim()?.toLowerCase();

    if (normalized === "undefined") {
      newObject[key] = undefined;
    } else if (normalized === "null") {
      newObject[key] = null;
    } else if (Number.isNaN(key) || normalized === "nan") {
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
