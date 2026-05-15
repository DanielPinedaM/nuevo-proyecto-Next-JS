# ⚛️ Next JS 15 + React 19 + Prime React 10 +  Tailwind 4

usar NodeJS 24.15.0

## 📦 Instalar paquetes

```console
npm i
```

## ▶️ Ejecutar proyecto

comando                | apunta a...   | ruta archivo
---------------------- | ------------- | -------------
node --run start:local | local host    | `environments/.env.localhost`
node --run start:test  | pruebas       | `environments/.env.test`
node --run start:prod  | producción    | `environments/.env.production`

## 🚀 Generar build (dist) para desplegar

comando               | apunta a...   | ruta archivo
--------------------- | ------------- | -------------
node --run build:test | pruebas       | `environments/.env.test`
node --run build:prod | producción    | `environments/.env.production`

## 💻 Tecnologías

* **NextJS:** usa la sintaxis de React y las peticiones son server side rendering

* **TypeScript:** tipado de datos

* **Turbopack:** es el empaquetador de Next, sirve para ejecutar Next en desarrollo (local)

* **Tailwind y Sass:** estilos y maquetado

* **Zustand:** estado global

* **Prime React:** librería de UI, sirve para tablas, input, etc

* **React hook form:** manejo de formularios

* **react icons:** Iconos de React

## 📁  Estructura de carpetas

ESTO HAY Q CORREGIRLO:
- ACTUALIZARLO POR LAS NUEVAS CARPETAS

- USAR ARBOL JERARQUICO DE ARCHIVOS Y CARPETAS CON ├── Y └──

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

***❌ Incorrecto - usar `new Date()`***

```ts
const now = new Date();
const formatted = now.toLocaleDateString();
```

***❌ Incorrecto - usar moment.js***

```ts
import moment from 'moment';

const today = moment().format('YYYY-MM-DD');
```

***✅ Correcto - usar Luxon***

```ts
import { DateTime } from 'luxon';

const now = DateTime.now();
const formatted = now.toFormat('yyyy-MM-dd');
```

En `src\shared\utils\func\luxon.utils.ts` hay funciones para el manejo (formateo) de fecha y hora usando Luxon.

***❌ Incorrecto - NO usar `formatDate`, usar Luxon directo***

Problemas de este enfoque:

* Repetición de código en múltiples componentes

* cada dev formatea fechas de forma distinta, sin estandarización.

```ts
'use client';
import { DateTime } from 'luxon';

export default function MyComponent() {

  const getDate = () => {
    const now = DateTime.now();

    const formatted = now
      .setLocale('es')
      .toFormat('d-LLL-yyyy hh:mm:ss a');

    console.log(formatted);
  };

  return (
      <button onClick={getDate}>
        Mostrar fecha
      </button>
  );
}
```

***✅ Correcto - usar `formatDate`***

```ts
'use client';
import { DateTime } from 'luxon';
import { formatDate } from "@/shared/utils/func/luxon.utils";

export default function MyComponent() {

  const getDate = () => {
    const formatted = formatDate(
      DateTime.now(),
      'd-LLL-yyyy hh:mm:ss a'
    );

    console.log(formatted);
  };

  return (
      <button onClick={getDate}>
        Mostrar fecha
      </button>
  );
}
```

En `src\shared\utils\func\luxon.utils.ts` hay función para obtener fecha y hora actual con formato de fecha y hora personalizada 

***❌ Incorrecto - usar Luxon directamente para obtener fecha y hora actual***

Problemas de este enfoque:

* Repetición de código en múltiples componentes

* cada dev formatea fechas de forma distinta, sin estandarización.

```ts
'use client';
import { DateTime } from 'luxon';

export default function MyComponent() {

  const getCurrentDateTime = () => {
    const now = DateTime.now()
      .setLocale('es')
      .toFormat('d-LLL-yyyy hh:mm:ss a')
      .replace(/\.$/, '');

    const fixed = now
      .replace(/p\.\s?m/gi, 'p.m')
      .replace(/a\.\s?m/gi, 'a.m');

    console.log(fixed);
  };

  return (
      <button onClick={getCurrentDateTime}>
        Mostrar fecha actual
      </button>
  );
}
```

***✅ Ejemplo correcto - usar `luxon.utils.ts`***

```ts
'use client';
import { currentDateAndTime } from "@/shared/utils/func/luxon.utils";

export default function MyComponent() {

  const getCurrentDateTime = () => {
    const current = currentDateAndTime(
      'd-LLL-yyyy hh:mm:ss a'
    );

    console.log(current);
  };

  return (
      <button onClick={getCurrentDateTime}>
        Mostrar fecha actual
      </button>
  );
}
```

## 📝 Formularios

INCOMPLETO- aqui me falta:
* explicar y dar ejemplo incorrecto y correcto de cada uno, se tiene q usar react hook form SIEMPRE  NO usar para formularios 
   * use state para los formulario controlado
   * Formularios no controlados

* usar watch de react hook form, NO usar on change (escribir ejemplo incorrecto y correcto de cada uno)

## 💅 Maquetación
* Todos los componentes **no** pueden tener archivos de Sass, se tiene que maquetar en Tailwind.

* Mezclar Sass con Tailwind es mala práctica porque Sass sobrescribe los estilos de Tailwind porque Sass tiene más especificidad que Tailwind.

* Los únicos archivos de Sass tienen que ser globales y estar en ```src/app/scss/global```.
