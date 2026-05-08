# ⚛️ Next JS 15 + React 19 + Prime React 10 +  Tailwind 4

usar NodeJS 24.11.1

## 📦 Instalar paquetes

```console
npm i
```

## ▶️ Ejecutar proyecto

comando                | apunta a...   | ruta archivo
---------------------- | ------------- | -------------
node --run start:local | local host    | environments/.env.localhost
node --run start:test  | pruebas       | environments/.env.test
node --run start:prod  | producción    | environments/.env.production

## 🚀 Generar build (dist) para desplegar

comando               | apunta a...   | ruta archivo
--------------------- | ------------- | -------------
node --run build:test | pruebas       | environments/.env.test
node --run build:prod | producción    | environments/.env.production

## 💻 Tecnologías

* **NextJS:** usa la sintaxis de React y las peticiones son server side rendering

* **TypeScript:** tipado de datos

* **Turbopack:** es el empaquetador de Next, sirve para ejecutar Next en desarrollo (local)

* **Tailwind y Sass:** estilos y maquetado

* **Zustand:** estado global

* **Prime React:** librería de UI, sirve para tablas, input, etc

* **React hook form:** manejo de formularios

* **react icons:** Iconos de React

## 💅 Maquetación
* Todos los componentes **no** pueden tener archivos de Sass, se tiene que maquetar en Tailwind.

* Mezclar Sass con Tailwind es mala práctica porque Sass sobrescribe los estilos de Tailwind porque Sass tiene más especificidad que Tailwind.

* Los únicos archivos de Sass tienen que ser globales y estar en ```src/app/scss/global```.

## 📁  Estructura de carpetas
* **/environments**: Variables de entorno .env para desarrollo (local host), produccion y pruebas

* **src/app/**: Enrutado de Next JS

* **src/components**: Componentes generales que se pueden re-utilizar en cualquier parte de la aplicacion

* **src/components/GeneralErrorMessage.tsx**: Componente que muestra los mensajes de error asociados a un campo de un formulario de React Hook Form

* **src/scss**: Estilos globales de Sass

* **src/types/constant**: Constantes

* **src/types/interface**: Interface asociadas a las constantes

* **src/utils/func/general.ts**: Funciones generalres que se pueden re-utilizar en cualquier parte de la aplicacion

* **src/utils/func/sessionStorage.ts**: Funciones para guardar, listar, actualizar y eliminar propiedad:valor en sessionStorage, codifica y de-codifica en base 64, detecta cuando usar JSON.stringify() y JSON.parse()

* **public/assets/icon**: Iconos

* **public/assets/img**: Imagenes

* **src/store**: Estado global en Zustand para compartir estados entre componentes

* **src/api/generalServiceHttp.ts**: Funcion general para hacer peticiones HTTP usando fetch, sirve para Server Side Rendering y "use client"

## 📅 Fechas

Usar la librería **Luxon** para el manejo de fechas. **NO** usar `new Date()` **NI** librerías como Moment.js.

Esto se debe a que:

* `new Date()` tiene comportamientos inconsistentes entre zonas horarias.

* `new Date()` Es difícil de formatear y manipular de forma segura.

* `new Date()` No maneja bien timezones ni conversiones complejas.

* [Moment.js está en modo legacy/deprecado y ya no se recomienda para proyectos modernos.](https://momentjs.com/docs/#/-project-status/)

* Luxon ofrece una API más clara, moderna y robusta para fechas, tiempos y zonas horarias.

En `src\shared\utils\func\luxon.utils.ts` hay funciones para el manejo (formateo) de fechas usando Luxon.

***❌ Incorrecto***

```ts
/* new Date() */

const now = new Date();
const formatted = now.toLocaleDateString();
```

```ts
/* moment.js */

import moment from 'moment';

const today = moment().format('YYYY-MM-DD');
```

***✅ Correcto***

```ts
import { DateTime } from 'luxon';

const now = DateTime.now();
const formatted = now.toFormat('yyyy-MM-dd');
```


