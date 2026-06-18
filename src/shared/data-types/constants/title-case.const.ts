/*
 ********************************************
 * configurar mayusculas iniciales de texto *
 ******************************************** */

import { Options } from "title-case";

const smallWords: string[] = [
  "a",
  "ante",
  "bajo",
  "cabe",
  "con",
  "contra",
  "de",
  "es",
  "desde",
  "durante",
  "en",
  "entre",
  "hacia",
  "hasta",
  "mediante",
  "para",
  "por",
  "segun",
  "según",
  "sin",
  "so",
  "sobre",
  "tras",
  "y",
  "e",
  "ni",
  "o",
  "u",
  "el",
  "la",
  "los",
  "las",
  "un",
  "una",
  "uno",
  "unos",
  "unas",
  "del",
  "al",
];

export const titleCaseOptions: Options = {
  locale: "es-CO",
  sentenceCase: false,
  smallWords: new Set(smallWords),
};
