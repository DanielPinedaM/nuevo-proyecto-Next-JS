/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isValidJSONparse } from "@/utils/func/dataType";

/*
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 █ funciones para CRUD y buscar en el sessionStorage con Base64 █
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ */

 export interface ISessionStorageObject {
    [key: string]: string;
  }

  type TSessionStorageValue = string | number | null | undefined | boolean | Date | any[] | object;

  type TSessionStorageListValue = any | string | any[] | null | undefined | boolean;

  const errorMessage = (functionName: string, property: any, value?: TSessionStorageValue) => {
    if (value) {
      console.error(`❌ error en sessionStorage al ejecutar la funcion ${functionName}(`,property,',',value,')','porque la propiedad ',property,'tiene que ser un string que no sea vacio "" \n \nel valor de la propiedad es ',value,'\n \nsessionStorage solamente admite guardar propiedades y valores que son tipo string');
    } else {
      console.error(`❌ error en sessionStorage al ejecutar la funcion ${functionName}(`,property,')','porque la propiedad ',property,'tiene que ser un string que no sea vacio "" \n \nsessionStorage solamente admite guardar propiedades y valores que son tipo string');
    }
  };

  const isValidString = (property: string): boolean => {
    if (typeof property !== 'string' || property?.trim() === '') {
      return false;
    }
  
    return true;
  };

  const convertToString = (value: TSessionStorageValue): TSessionStorageValue => {
    // solamente se puede hacer JSON.stringify() de un
    // 1) array []
    if (Array.isArray(value)) return JSON.stringify(value);
  
    // 2) objeto literal {}
    if (Object.prototype.toString.call(value) === '[object Object]' && typeof value === 'object') {
      return JSON.stringify(value);
    }
  
    return value;
  };

  /* sessionStorage - listar todas las propiedad: valor en un objeto literal {} */
  export const sessionStorageListAll = (): ISessionStorageObject | null => {
    const storageObject: ISessionStorageObject = {};
    const length: number = sessionStorage.length;
  
    if (!length) return null;
  
    for (let i: number = 0; i < length; i++) {
      const key: string | null = sessionStorage.key(i);
  
      if (key) {
        const value: TSessionStorageListValue = sessionStorageListValue(atob(key))
        storageObject[atob(key)] = value;
      }
    }
  
    return storageObject;
  };

  /* sessionStorage - Object.keys() - array [] con nombres de todas las propiedades */
  export const sessionStorageProperties = (): string[] | null => {
    const listAll: ISessionStorageObject | null = sessionStorageListAll();
  
    return listAll ? Object.keys(listAll) : null;
  };

  /* sessionStorage - Object.values() - array [] con nombres de todos los valores */
  export const sessionStorageValues = (): string[] | null => {
    const listAll: ISessionStorageObject | null = sessionStorageListAll();
  
    return listAll ? Object.values(listAll) : null;
  };

  /* sessionStorage - listar un solo valor de una propiedad en especifico */
  export const sessionStorageListValue = (property: string): string | any[] | any => {
    if (!isValidString(property)) {
      errorMessage('sessionStorageListValue', property);
      return '';
    }
  
    let value: string | null = null;
  
      // NO convertir el token a Base 64
      if (property === "token"
          || property === "accessToken") {
        value = sessionStorage.getItem(btoa(property));
        return value;
      }
      
      // devuelve null cuando NO existe la propiedad en sessionStorage
      value = sessionStorage.getItem(btoa(property))
      if (value === null) return null;
  
      value = atob(sessionStorage.getItem(btoa(property))!);
  
      // devuelve 'null' (tipo string) cuando el valor de la propiedad en sessionStorage
      // - SI existe
      // - es 'null' (tipo string)
      if (value?.trim() === 'null') return 'null';
  
      if (value?.trim() === 'undefined') return undefined;
      if (value?.trim() === 'NaN') return NaN;
      if (value?.trim() === 'true') return true;
      if (value?.trim() === 'false') return false;
      if (isValidJSONparse(value)) return JSON.parse(value);
      return value;
  };

  /* sessionStorage - buscar una propiedad */
  export const sessionStorageSearch = (property: string): boolean => {
    if (!isValidString(property)) {
      errorMessage('sessionStorageSearch', property);
      return false;
    }

    const value: string | null = sessionStorage.getItem(btoa(property));
    return value !== null ? true : false;
  };

  /* sessionStorage - guardar una nueva propiedad: valor
     "cuando NO existe lo creo" */
  export const sessionStorageSave = (property: string, value: TSessionStorageValue): boolean => {
    if (!isValidString(property)) {
      errorMessage('sessionStorageSave', property, value);
      return false;
    }

    const search: boolean = sessionStorageSearch(property);

    if (search) return false;

    const stringValue: TSessionStorageValue = convertToString(value);
    // NO convertir el token a Base 64
    if (property === "token"
      || property === "accessToken") {
      sessionStorage.setItem(btoa(property), stringValue as string);
    } else {
      sessionStorage.setItem(btoa(property), btoa(stringValue as string));
    }
    return true;
  };

  /* sessionStorage - actualizar (sobrescribir) el valor de una propiedad SI existe
     "cuando SI existe lo actualizo" */
  export const sessionStorageUpdate = (property: string, value: TSessionStorageValue): boolean => {
    if (!isValidString(property)) {
      errorMessage('sessionStorageUpdate', property, value);
      return false;
    }
  
    const search: boolean = sessionStorageSearch(property);
  
    // NO se puede actualizar el valor de una propiedad q no existe
    if (!search) return false;
    
    const stringValue: TSessionStorageValue = convertToString(value);
    // NO convertir el token a Base 64 
    if (property === "token"
      || property === "accessToken") {
      sessionStorage.setItem(btoa(property), stringValue as string);
    } else {
      sessionStorage.setItem(btoa(property), btoa(stringValue as string));
    }
    return true;
  };

  /*
  SIEMPRE se guarda una propiedad: valor

  Cuando NO existe la propiedad en sessionStorage, GUARDA una NUEVA propiedad: valor
  y cuando SI existe la propiedad en sessionStorage, ACTUALIZA (sobrescribe) el valor de la propiedad existente

  sessionStorageSaveAndUpdate() combina lo q hace sessionStorageSave() y sessionStorageUpdate()
  sessionStorageSaveAndUpdate() = sessionStorageSave() + sessionStorageUpdate() */
  export const sessionStorageSaveAndUpdate = (property: string, value: TSessionStorageValue): boolean => {
    if (!isValidString(property)) {
      errorMessage('sessionStorageSaveAndUpdate', property, value);
      return false;
    }
  
    const stringValue: TSessionStorageValue = convertToString(value);
  
    // NO convertir el token a Base 64 
    if (property === "token"
      || property === "accessToken") {
      sessionStorage.setItem(btoa(property), stringValue as string);
    } else {
      sessionStorage.setItem(btoa(property), btoa(stringValue as string));
    }
    return true;
  };

  /* sessionStorage - eliminar TODAS las propiedad: valor */
  export const sessionStorageDeleteAll = (): boolean => {
    const length: number = sessionStorage.length;

    if (length === 0) return false;

    sessionStorage.clear();
    return true;
  };

  /* sessionStorage - eliminar TODAS las propiedad: valor EXCEPTO las q estan en el array properties

  Ejemplo:
  eliminar TODAS las propiedades EXCEPTO 'token' y 'nombre'
  sessionStorageDeleteExcept(['token', 'nombre']) */
  export const sessionStorageDeleteExcept = (properties: string[]): boolean => {
    if (!sessionStorage.length) {
      console.error('❌ error: NO existen propiedades en el sessionStorage para eliminar \n', sessionStorage);
      return false;
    }

    if (!Array.isArray(properties)) {
      console.error('❌ error: el parametro',properties,'de la funcion sessionStorageDeleteExcept(',properties,') tiene q ser un array de string con las propiedades del sessionStorage que NO se eliminan');
      return false;
    }

    if (!properties.length) {
      console.error('❌ error: el parametro',properties,'de la funcion sessionStorageDeleteExcept(',properties,') tiene q ser un array de string con minimo uno o mas elementos \n\nel parametro',properties,'tiene ',properties.length,'elemento(s)');
      return false;
    }

    const anElementIsNotString: boolean = properties.some(
      (property: string) => typeof property !== 'string' || property?.trim() === ''
    );
    if (anElementIsNotString) {
      errorMessage('sessionStorageDeleteExcept', properties);
      return false;
    }

    const sessionStorageKeys: string[] = sessionStorageProperties()!;

    properties = properties.map((item: string) => (btoa(item)));

    // eliminar las propiedad: valor del sessionStorage q NO estan en el parametro properties: string[]
    sessionStorageKeys.forEach((property: string) => {
      if (!properties.includes(btoa(property))) {
          sessionStorage.removeItem(btoa(property));
      }
    });

    // se borro las propiedades del sessionStorage cuando
    // la longitud de array properties.length
    // y del sessionStorage sessionStorage.length sean las mismas
    return properties.length === sessionStorage.length;
  };

  /* sessionStorage - eliminar UNA SOLA propiedad: valor en ESPECIFICO */
  export const sessionStorageDeleteSpecific = (property: string): boolean => {
    if (!isValidString(property)) {
      errorMessage('sessionStorageDeleteSpecific', property);
      return false;
    }

    const search: boolean = sessionStorageSearch(property);

    // NO se puede eliminar una propiedad: valor q no existe
    if (!search) return false;

    sessionStorage.removeItem(btoa(property));
    return true;
  };