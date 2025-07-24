import { NextRequest, NextResponse } from "next/server";
import { IResponse } from "@/services/generalService/types/requestDataTypes"
import { nameCookieKey } from "@/models/constants/cookie-storage.constants";
import { decodeTokenInServer } from "@/services/auth/auth";
import { constPath } from "@/models/constants/path.constants";

export async function middleware(request: NextRequest) {
  const {
    cookies,
    url,
    nextUrl: { pathname },
  } = request;

  // ¿la ruta actual es la ruta raiz "/"?
  const isRoot: boolean = url === new URL("/", url).href;

  // re-dirigir a /iniciar-sesion
  const loginUrl: URL = new URL("/" + constPath.login, url);

  // acceder a las cookiess
  const cookieAccessToken: string | undefined = cookies.get(nameCookieKey.accessToken)?.value;

  /*
   el siguiente codigo funciona, esta bueno, lo comente porque no existe el endpoint que llama la funcion decodeTokenInServer()
  const cookieRole: string | undefined = cookies.get(nameCookieKey.role)?.value;
  const cookieEmail: string | undefined = cookies.get(nameCookieKey.email)?.value; */

  // re-direccionar a login cuando se accede a ruta raiz y NO existe token en las cookies
  if (isRoot && !cookieAccessToken) {
    return NextResponse.redirect(loginUrl);
  }

  // re-direccionar a login cuando NO existe token en las cookies
  if (!cookieAccessToken) {
    return NextResponse.redirect(loginUrl);
  }

  // validar:
  // - Secret key del token
  // - Si el token ha expirado o no
  // - Que el token NO ha sido modificado
  /* 
  el siguiente codigo funciona, esta bueno, lo comente porque no existe el endpoint que llama la funcion decodeTokenInServer()

  const { success, message, status, data }: IResponse = await decodeTokenInServer();
  const { email, role } = data;

  if (status >= 500) {
    console.error(`❌ middleware.ts - error en el servidor en la URL ${url}`);
    return NextResponse.next();
  }

  if (status === 401) {
    console.error("❌ middleware.ts - error 401: Unauthorized - NO tiene permisos para acceder");
    console.error("mensaje de la API ", message);
    return NextResponse.redirect(loginUrl);
  }

  if (!success) {
    console.error("❌ middleware.ts -  success es false al de-codificar el token");
    console.error("mensaje de la API ", message);
    return NextResponse.redirect(loginUrl);
  }

  // despues de q el usuario se loguea,
  // re-dirigir a /inicio/[tipo_de_usuario]/... dependiendo de tipo usuario cuando la ruta actual es:
  // - la ruta raiz /
  // - /inicio
  if (!role) {
    console.error(
      "❌ middleware.ts - error, NO se pudo acceder al TIPO DE USUARIO al de-codificar el token \nrole",
      role
    );
    return NextResponse.redirect(loginUrl);
  }

  const redirectToHome: string = routeHomeByUserType(role);
  if (isRoot || pathname === "/" + constPath.home) {
    return NextResponse.redirect(new URL(redirectToHome, url));
  }

  // 1) proteger las rutas dependiendo del tipo de usuario
  // ejemplo: administrador NO puede acceder a rutas de otro usuario q no sea administrador
  // 2) permitir acceder de forma segura al tipo usuario desde la ruta actual con .split("/")[2]
  const userTypeOnRoute: string = pathname.split("/")[2];
  if (
    role !== cookieRole || // tipo usuario de base de datos es diferente al q se guarda en las cookies
    role !== userTypeOnRoute // tipo usuario de base de datos es diferente al de la ruta actual /inicio/[tipo_usuario]/...
  ) {
    console.error(
      "\n ❌ middleware.ts - error 401, acceso denegado, el TIPO DE USUARIO no coincide"
    );
    return NextResponse.redirect(loginUrl);
  }

  // validar q NO se modifique el email q se guarda en las cookies
  if (!email) {
    console.error(
      "❌ middleware.ts - error, NO se pudo acceder al EMAIL al de-codificar el token email",
      email
    );
    return NextResponse.redirect(loginUrl);
  }

  if (email !== cookieEmail) {
    console.error("\n ❌ middleware.ts - error 401, acceso denegado, el CORREO no coincide");
    return NextResponse.redirect(loginUrl);
  } */

  return NextResponse.next();
}

export const config = {
  // ejecutar middleware en ruta raiz y despues de loguearse en /inicio/...
  matcher: ["/", "/inicio/:path*"],
};
