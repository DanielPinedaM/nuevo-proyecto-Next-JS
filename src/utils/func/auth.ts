import { constPath } from '@/types/constant/const-path';
import { isUseClient } from './general';

/**
re-dirigir a inicio segun el tipo de usuario */
export const routeHomeByUserType = (user: string): string => {
  let route: string = '/' + constPath.home.home + '/';

  if (user === "administrador") {
    route = route + constPath.home.administrador;

  } else if (user === "usuario") {
    route = route + constPath.home.usuario;

  } else {
    console.error(
      '❌ error no se puede re-dirigir a inicio porque el tipo de usuario es invalido, \n',
      'el tipo de usuario es ',
      user
    );
    route = '';
  }

  return route;
};

/**
obtener el nombre del tipo de usuario
solamente sirve en componentes 'use client' */
export const userTypeOnRoute = (): string => {
  if (isUseClient()) {
    const pathname: string = window.location.pathname;
    return pathname.split('/')[2];
  } else {
    console.error(
      "❌ error, NO se puede determinar el tipo de usuario porque la función userTypeOnRoute() no puede acceder a la ruta actual en 'use server'"
    );
    return '';
  }
};
