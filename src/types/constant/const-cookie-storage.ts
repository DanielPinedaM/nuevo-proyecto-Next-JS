import { IObjCookie, IObjStorage } from "../interface/interface-cookie-storage";

/* ********
* cookies *
* ********* */

// nombres de las propiedades q se guardan en las COOKIES
export const objCookie: IObjCookie = {
  token: "dG9rZW4",
  userType: "dXNlciB0eXBl",
};

// opciones de la cookie q guarda el token en el login
export const cookieOptionsInLogin = (token: string) => ({
  name: objCookie.token,
  value: token,

  // la cookie es accesible por el servidor y cliente
  httpOnly: false,

  // usar cookie solo en HTTPS y en producción
  secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",

  // la cookie solamente esta disponible en el mismo dominio donde se genera
  sameSite: "strict" as const,

  // la cookie expira despues de 1 dia
  maxAge: 86400,

  // dominio donde la cookie es valida
  domain: process.env.NEXT_PUBLIC_DOMAIN,

  // la cookie es accesible desde todas las rutas en el dominio donde se esta ejecutando la pagina web
  path: "/"
});

/* ***************
* sessionStorage *
* **************** */

// nombres de las propiedades q se guardan en SESSION STORAGE
export const objStorage: IObjStorage = {
  // hace q la petición http de listar menu se ejecuta UNA VEZ, solamente al cargar la página por primera vez
  menuOptions: "menuOptions"
};