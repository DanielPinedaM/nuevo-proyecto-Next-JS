/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from "luxon";
import { Nullable } from "primereact/ts-helpers";

/**
Eliminar espacio en blanco reemplazando:
- "p. m" por "p.m"
- "a. m" por "a.m" */
const replaceAmPm = (date: Date | string | any): string | any => {
  if (!date) return date;

  return date.replace(/p\.(\s| )m/gi, "p.m").replace(/a\.(\s| )m/gi, "a.m").replace(/\.$/, "");
};

/**
formato de hora */
export const formatHour = (
  date: Date | string | Nullable<Date> | any,
  format: string = 'hh:mm:ss a'
): string | any => {
  let dateTime: DateTime;

  if (date instanceof Date) {
    dateTime = DateTime.fromJSDate(date);
  } else if (typeof date === "string" && String(date)?.trim() !== "") {
    dateTime = DateTime.fromISO(date);
  } else {
    return date;
  }

  if (!dateTime.isValid) return date;

  const finalDate: string = dateTime.setLocale("es").toFormat(format);

  return replaceAmPm(finalDate);
};

/**
formato de fecha */
export const formatDate = (
    date: Date | string | Nullable<Date> | DateTime,
    format: string = 'd-LLL-yyyy'
): string | any => {
  let dateTime: DateTime;

  if (date instanceof Date) {
    dateTime = DateTime.fromJSDate(date);
  } else if (typeof date === "string" && String(date)?.trim() !== "") {
    dateTime = DateTime.fromISO(date);
  } else {
    return date;
  }

  if (!dateTime.isValid) return date;

  const finalDate: string = dateTime.setLocale('es').toFormat(format);

  return replaceAmPm(finalDate);
};

/**
formato de fecha y hora con a.m y p.m */
export const dateAndTimeFormat = (date: Date | string | Nullable<Date>): string | any => {
  let dateTime: DateTime;

  if (date instanceof Date) {
    dateTime = DateTime.fromJSDate(date);
  } else if (typeof date === "string" && String(date)?.trim() !== "") {
    dateTime = DateTime.fromISO(date);
  } else {
    return date;
  }

  if (!dateTime.isValid) return date;

  const finalDate: string = dateTime
    .setLocale("es")
    .toFormat("d-LLL-yyyy hh:mm a")
    .replace(/\.$/, "")
    .replace("p. m", "p.m")
    .replace("a. m", "a. m");

  return replaceAmPm(finalDate);
};

/**
fecha y hora actual con a.m y p.m  */
export const currentDateAndTime = (): string => {
  const finalDate: string = DateTime.now()
    .setLocale("es")
    .toFormat("d-LLL-yyyy hh:mm:ss a")
    .replace(/\.$/, "");

  return replaceAmPm(finalDate);
};
