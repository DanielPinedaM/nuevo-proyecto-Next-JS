import { INameCookieKey, IObjStorage } from '../interfaces/cookie-storage.interfaces';

/* ********
 * cookies *
 * ********* */

// nombres de las propiedades q se guardan en las COOKIES
export const nameCookieKey: INameCookieKey = {
  accessToken: 'accessToken',
  userType: 'userType',
  role: 'role',
  email: 'email',
};

/**
lista de opciones de configuracion de las cookies al loguearse */
export const cookieOptionsInLogin = ({ maxAge }: { maxAge: number }) => ({
  // la cookie es accesible por el servidor y cliente
  httpOnly: false,

  // usar cookie solo en HTTPS y en producción
  secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",

  // la cookie solamente esta disponible en el mismo dominio donde se genera
  sameSite: "strict" as const,

  // tiempo de espiracion de la cookie en segundos
  maxAge,

  // dominio donde la cookie es valida
  domain: process.env.NEXT_PUBLIC_DOMAIN,

  // la cookie es accesible desde todas las rutas en el dominio donde se esta ejecutando la pagina web
  path: "/",
});

/* ***************
 * sessionStorage *
 * **************** */

// nombres de las propiedades q se guardan en SESSION STORAGE
export const objStorage: IObjStorage = {
  // hace q la petición http de listar menu se ejecuta UNA VEZ, solamente al cargar la página por primera vez
  menuOptions: 'menuOptions',
};
