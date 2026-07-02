<!-- BEGIN:nextjs-agent-rules -->

# Next.js: SIEMPRE lee la documentación antes de programar

Antes de realizar cualquier trabajo con Next.js, busca y lee la documentación correspondiente en `node_modules/next/dist/docs/`. Tus datos de entrenamiento sobre Next.js están desactualizados; la documentación es la fuente de la verdad.

<!-- END:nextjs-agent-rules -->

# Entorno de Ejecución
Node.js

# Manejador de Paquetes
`pnpm` y `pnpm-lock.yaml`

# Administrador de Versiones para Node.js
`fnm`

# Comandos

# Ejecutar Proyecto

| Comando            | Apunta a... | Ruta Archivo                   |
| ------------------ | ----------- | ------------------------------ |
| `pnpm start:local` | Local host  | `environments/.env.localhost`  |
| `pnpm start:test`  | Pruebas     | `environments/.env.test`       |
| `pnpm start:prod`  | Producción  | `environments/.env.production` |

# Generar build (dist) para Desplegar

| Comando           | Apunta a... | Ruta Archivo                   |
| ----------------- | ----------- | ------------------------------ |
| `pnpm build:test` | Pruebas     | `environments/.env.test`       |
| `pnpm build:prod` | Producción  | `environments/.env.production` |

# Reglas Obligatorias para la IA
* No generes análisis, recomendaciones ni comentarios adicionales hasta que empiece a realizar preguntas.

* Todas las respuestas, recomendaciones y fragmentos de código deben respetar obligatoriamente la arquitectura, reglas, patrones y convenciones definidas en este documento.

* No cuestiones, reemplaces, contradigas ni ignores las decisiones de arquitectura definidas en este proyecto.

* Siempre que respondas con código, debes indicar explícitamente la ubicación exacta de cada archivo basándote en la estructura base del proyecto definida en este documento.

* Si existe alguna ambigüedad, falta de contexto o algún aspecto importante de arquitectura, estructura o convenciones que no esté definido, primero debes preguntar antes de asumir una implementación.

* Si durante la conversación recibes instrucciones contradictorias, debes priorizar siempre las reglas y decisiones definidas inicialmente en este documento.

* La arquitectura, reglas y convenciones definidas en este documento tienen prioridad absoluta. Sin embargo, como no todos los casos posibles están documentados, si un problema no puede resolverse respetando la arquitectura actual o requiere una solución no contemplada en el README, primero debes advertir explícitamente que dicha solución se sale de la arquitectura o convenciones establecidas antes de generar una implementación.







- Como excepción a la regla anterior, escribir en español el nombre de las carpetas que definen una ruta URL del navegador en el App Router de Next.js, es decir, las carpetas que contienen un archivo `page.tsx` dentro de `src/app/(features)/<feature>` (por ejemplo, `iniciar-sesion` o `recuperar-clave`). El resto de carpetas, el nombre del archivo `page.tsx` y el nombre de la función o clase del componente asociado permanecen en inglés.



# Reglas de Idioma

## Responder en Español
Responder en español siempre, excepto lo que esta en "Excepciones, Responder en Ingles"

Es decir, redactar en español todas las explicaciones, comentarios de codigo, respuestas, preguntas, descripciones, análisis, recomendaciones, documentación y mensajes dirigidos al usuario. Con la excepcion de lo siguiente que tiene que estar en ingles:

## Excepciones, Responder en Ingles
* Términos técnicos de uso común en desarrollo de software: hook, stores, api, ui, utils, component, props, middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload, patrones de diseño, etc.

* Nombres de frameworks, librerías, paquetes, APIs

* Código fuente (todo, **excepto los comentarios de codigo**): Identificadores, nombres de archivos y carpetas, clases, interface, enum, métodos, funciones, parámetros, variables, nombres de archivos reservados de Next.js (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`), route groups `(nombre)`, carpetas privadas `_nombre`, segmentos dinámicos `[param]`

## Excepciones dentro de las Excepciones, esto debe estar en Español
Aunque la sección anterior indica que los "nombres de archivos y carpetas" van en inglés, existe un caso puntual que queda **excluido de esa excepción** y por lo tanto debe estar en español:

1. Los nombres de las carpetas dentro de `src/app/(features)` que representen un **segmento de ruta (route segment) visible en la URL**
2. Las carpetas dentro de `src/features/<feature>` que representen una página/ruta y que estén asociadas a ese segmento de ruta en `src/app/`

### Explicación
En Next.js App Router no existe un archivo central de rutas: el nombre de la carpeta dentro de `app/` **es** el segmento de la URL. Por eso, toda carpeta dentro de `src/app/` que aparezca en la URL final debe estar en español. Quedan excluidos de esta regla (se mantienen en inglés): route groups `(nombre)`, carpetas privadas `_nombre`, segmentos dinámicos `[param]` y archivos reservados como `page.tsx`.

src/app/
├── (features)/                    # route group, no aparece en la URL -> ingles
│   ├── iniciar-sesion/        # segmento de ruta -> español
│   │   └── page.tsx
│   ├── recuperar-clave/       # segmento de ruta -> español
│   │   └── page.tsx
│   └── asignar-nueva-clave/   # segmento de ruta -> español
│       └── [id]/              # segmento dinamico -> ingles
│           └── page.tsx
└── bots/                       # segmento de ruta -> español
└── page.tsx
