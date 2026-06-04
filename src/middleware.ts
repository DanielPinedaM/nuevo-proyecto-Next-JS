import { NextRequest, NextResponse } from 'next/server';
import { IResponse } from '@/shared/api/general-api/types/request-data.types';
import { GET } from '@/shared/api/general-api/http-gateway.api';

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

  /**
   * 🚨 TODO: ⚠️
   * - Reemplazar esta URL por el endpoint de backend encargado de validar la sesión.
   * - El backend debe leer el JWT desde la cookie HttpOnly
   * - NO utilizar localStorage, sessionStorage ni mecanismos similares para almacenar o recuperar el token desde el frontend.
   * - PROHIBIDO: const token = localStorage.getItem("token")
   * - El backend debe validar que el JWT sea valido (firma, fecha de expiracion, etc)
   * - La autenticación debe depender exclusivamente de la validación realizada por el backend sobre la cookie HttpOnly.
   * - Ignorar estas recomendaciones y exponer el JWT al código JavaScript del frontend incrementa significativamente el riesgo de robo del token mediante ataques XSS (Cross-Site Scripting)
   * - Descomentar el código de validación ubicado más abajo para activar la protección de rutas. Actualmente se encuentra comentado únicamente para facilitar pruebas y permitir la navegación sin restricciones durante el desarrollo. */
  //const { success, message, status }: IResponse = await GET(
  //  `${process.env.NEXT_PUBLIC_API}reemplazar-por-endpoint-de-autenticacion`
  //);

  //if (!success) {
  //  console.error('❌ [proxy.ts] Error de autenticación, respuesta de la API: ', {
  //    success,
  //    message,
  //    status,
  //  });

  //  return NextResponse.redirect(loginUrl);
  //}

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
