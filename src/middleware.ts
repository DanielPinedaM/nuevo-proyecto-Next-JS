import { NextRequest, NextResponse } from 'next/server';
import { IResponse } from '@/shared/api/general-api/types/request-data.types';

export async function middleware(request: NextRequest) {
  const { url } = request;

  // ¿la ruta actual es la ruta raiz "/"?
  const isRoot: boolean = url === new URL('/', url).href;

  // re-dirigir a /iniciar-sesion
  const loginUrl: URL = new URL('/iniciar-sesion', url);

  // re-direccionar a login cuando se accede a ruta raiz
  if (isRoot) {
    return NextResponse.redirect(loginUrl);
  }

  /* 
  el siguiente codigo funciona, esta bueno, lo comente porque este endpoint no existe

  en back se debe crear un endpoint q valide la cookie http only true q contiene el token 
  y si el usuario tiene permisos para acceder a las rutas q estan despues de iniciar sesion

  // validar q el token no expire
  const { success, message, status, data }: IResponse = await GET(`${process.env.NEXT_PUBLIC_API}`);

  if (status >= 500) {
    console.error(`❌ proxy.ts - error en el servidor en la URL ${url}`);
    return NextResponse.next();
  }

  if (status === 401) {
    console.error("❌ proxy.ts - error 401: Unauthorized - NO tiene permisos para acceder");
    console.error("mensaje de la API ", message);
    return NextResponse.redirect(loginUrl);
  }

  if (!success) {
    console.error("❌ proxy.ts -  success es false");
    console.error("mensaje de la API ", message);
    return NextResponse.redirect(loginUrl);
  } */

  return NextResponse.next();
}

/**
Ejecutar middleware en ruta raiz "/" y en todas las rutas, excepto en:
- iniciar-sesion
- archivos internos de Next
- favicon */
export const config = {
  matcher: ['/((?!iniciar-sesion|_next/static|_next/image|favicon.ico).*)'],
};
