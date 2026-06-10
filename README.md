# ⚛️ Next JS 16 + React 19 + Prime React 10 + React Hook Form + Tailwind 4 + Sass + Zustand

# 🟢 Versión de Node JS

Este proyecto debe ejecutarse utilizando:

```bash
Node JS 24.16.0
```

# 📦 Instalar paquetes

```console
npm i
```

# ▶️ Ejecutar proyecto

comando                | apunta a...   | ruta archivo
---------------------- | ------------- | -------------
node --run start:local | local host    | `environments/.env.localhost`
node --run start:test  | pruebas       | `environments/.env.test`
node --run start:prod  | producción    | `environments/.env.production`

# 🚀 Generar build (dist) para desplegar

comando               | apunta a...   | ruta archivo
--------------------- | ------------- | -------------
node --run build:test | pruebas       | `environments/.env.test`
node --run build:prod | producción    | `environments/.env.production`

# 🤖 Skill para Uso de IA

> [!WARNING]
> # ⚠️ ****IMPORTANTE**** 🚨
>
> ****Ignorar esta sección ocasionará que la IA genere código que no respete la arquitectura, estructura ni las convenciones del proyecto, produciendo código inconsistentes y desordenadas.****

Para que la IA pueda responder correctamente y respetar la estructura de este proyecto, antes de realizar cualquier pregunta en herramientas de IA como Chat GPT, Claude, Gemini, etc., ***desde aquí en adelante*** debes copiar y pegar completamente este `README.md`

No debes copiar secciones anteriores del `README.md`

Debes copiar únicamente el contenido que se encuentra desde aquí hacia abajo, incluyendo todas las secciones posteriores completas y sin omitir información.

## Stack Frontend del Proyecto

* Next JS 16 con App Router (`app`)
* React 19
* TypeScript 6
* PrimeReact 10
* React Hook Form 7
* Tailwind CSS 4
* Sass (versión moderna con `@use` y `@forward`, no utilizar `@import`)
* Zustand 5
* Luxon
* tailwind-merge
* clsx
* react-icons
* cookies-next

## Reglas Obligatorias para la IA

* No generes análisis, recomendaciones ni comentarios adicionales hasta que empiece a realizar preguntas.

* Todas las respuestas, recomendaciones y fragmentos de código deben respetar obligatoriamente la arquitectura, reglas, patrones y convenciones definidas en este documento.

* No cuestiones, reemplaces, contradigas ni ignores las decisiones de arquitectura definidas en este proyecto.

* Siempre que respondas con código, debes indicar explícitamente la ubicación exacta de cada archivo basándote en la estructura base del proyecto definida en este documento.

* Si existe alguna ambigüedad, falta de contexto o algún aspecto importante de arquitectura, estructura o convenciones que no esté definido, primero debes preguntar antes de asumir una implementación.

* Si durante la conversación recibes instrucciones contradictorias, debes priorizar siempre las reglas y decisiones definidas inicialmente en este documento.

* La arquitectura, reglas y convenciones definidas en este documento tienen prioridad absoluta. Sin embargo, como no todos los casos posibles están documentados, si un problema no puede resolverse respetando la arquitectura actual o requiere una solución no contemplada en el README, primero debes advertir explícitamente que dicha solución se sale de la arquitectura o convenciones establecidas antes de generar una implementación.

# 📁 Estructura Base del Proyecto

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

# 📅 Fechas

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

# 📝 Formularios en Next JS + React Hook Form + Prime React

## Objetivo
Estandarizar la implementación de formularios escalables, reutilizables y mantenibles en proyectos grandes

---

## Reglas obligatorias del sistema de formularios

### 1. Framework y renderizado
- Se trabaja en Next.js (App Router).
- Todos los componentes de formularios deben ser "use client".

### 2. Ubicación obligatoria de componentes

Es obligatorio usar los componentes reutilizables de inputs ubicados en:

```txt
src/shared/components/react-hook-form
```

---

### 3. Restricciones estrictas
- Prohibido usar inputs HTML nativos (`<input />`, `<select />`, etc.).
- Obligatorio usar componentes de PrimeReact para todos los campos.
- Prohibido usar formularios controlados con `useState`.
- Prohibido usar formularios no controlados con `useRef`.
- React Hook Form es la única fuente válida de estado del formulario.

---

### 4. React Hook Form (RHF)
- Es el único responsable del estado del formulario.
- `defaultValues` se define exclusivamente en `useForm` en el componente padre.
- `watch` es obligatorio para lógica derivada en el componente padre.
- `onChange` manual está prohibido fuera de los inputs controlados por `Controller`.

---

### 5. Uso obligatorio de `watch`

- Toda lógica condicional del formulario debe resolverse con `watch`.

- `watch` **NO** debe usarse dentro de componentes reutilizables de input que estan en `src/shared/components/react-hook-form`

- Prohibido usar `useState` + `onChange` para manejar formularios. Lo correcto es usar `watch` en el componente padre.

- Ejemplos: `disabled`, visibilidad, dependencias entre campos.

---

### 6. Componentes reutilizables
Un input reutilizable debe:
- Encapsular `Controller` de React Hook Form.
- Ser genérico (`T extends FieldValues`).
- Usar `control`, `name`, `rules`, `errors` como contrato base.
- No contener lógica de negocio.
- No definir reglas internas.
- No usar `watch`.
- Representar un único tipo de campo/input.
- No mezclar múltiples tipos de input en un mismo componente reutilizable.

***✅ Correcto***

- `InputText`
- `InputPassword`
- `InputNumber`
- `InputEmail`
- `InputPhone`
- `InputSelect`

***❌ Incorrecto***

- `GenericInput`
- `BaseInput`
- `DynamicInput`
- Un único componente que maneje:
  - `input type="text"`
  - `input type="password"`
  - `input type="number"`
  - `input type="email"`

---

### 7. UI (Prime React)
- PrimeReact solo maneja la capa visual.
- `disabled`, `placeholder`, `className` son props de UI.
- Prime React no puede modificar el estado del formulario.
- Solo refleja el estado final derivado de React Hook Form.

---

### 8. Validaciones
- Todas las validaciones se definen en el padre mediante `rules`.
- Se soportan múltiples validaciones (`required`, `minLength`, `pattern`, etc.).
- El input solo ejecuta las validaciones, no las define.

---

### 9. Formularios dinámicos
- La estructura del formulario debe definirse en el padre (config-driven).
- No se permite lógica condicional dentro de los componentes de input.

---

## Regla clave de arquitectura

* Input (componente hijo) = UI + conexión React Hook Form

* Padre = lógica + `watch` + validaciones + estado derivado

---

## Flujo obligatorio de datos

1. React Hook Form gestiona estado interno.
2. watch en el componente padre define reglas dinámicas.
3. El padre calcula props finales (ejemplo: `disabled`).
4. El input recibe solo valores finales.
5. PrimeReact renderiza UI.

---

## Prohibido

- Usar `watch` dentro de inputs reutilizables.
- Usar `useState` para formularios controlados
- Usar `useRef` para formularios no controlados
- Usar inputs nativos de HTML.
- Mezclar lógica de negocio dentro de inputs.
- Definir `defaultValues` fuera de `useForm`.
- Duplicar control de estado entre RHF y UI.
- Usar `map` para renderizar los campos de los formularios.

---

## Resultado esperado

- Formularios escalables y consistentes.
- Componentes reutilizables reales (design system).
- Cero duplicación de lógica de `Controller`.
- Separación estricta entre lógica y UI.
- Mantenimiento simple en proyectos grandes.

# INCOMPLETO - AQUI ME FALTA AGREGAR EJEMPLO DE INPUTS Q ESTAN EN SRC/SHARED/COMPONENTS/REACT-HOOK-FORM

---

# 💅 Maquetación

## 🧱 Configuración de Tailwind 4

[Igual que como se muestra en la documentacion](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration)

En este proyecto se está utilizando **Tailwind CSS V4**, por lo tanto el archivo `tailwind.config.js` ya no se utiliza y se considera **obsoleto** en esta arquitectura.

La configuración de Tailwind ahora se realiza en el archivo `src/styles/global/library/tailwind.css`

Esto permite centralizar la definición de tokens de diseño (colores, media queries, etc.) sin necesidad de configuración en archivo JavaScript.

***❌ Incorrecto - Configurar Tailwind 3 con `.js`***

```js
/* tailwind.config.js */

module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-color': 'oklch(62.8% 0.258 29.23)',
      },
    },
  },
};
```

***✅ Correcto - Configurar Tailwind 4 con `.css`***

```CSS
/* src/styles/global/library/tailwind.css */

@theme {
  --color-primary-color: oklch(62.8% 0.258 29.23) ;
}
```

## ⌨️ Configurar Auto-completado y Linter de Tailwind 4

En VS Code o en cualquier editor basado en VS Code (Antigravity, Cursor, Windsurf, etc.), seguir estos pasos;

1. Instalar extensión [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

2. Instalar extensión [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

3. Abrir el archivo `settings.json`

   - Atajo rápido: `Ctrl + Shift + P`
   - Luego escribir: `Preferences: Open User Settings (JSON)`

4. En `settings.json` agregar esto:

```json
/* Tailwind 4 */

{
  "tailwindCSS.experimental.configFile": "src/styles/global/library/tailwind.css", /* ruta del archivo .css de configuracion de Tailwind 4 */
  "tailwindCSS.emmetCompletions": true,
  "tailwindCSS.includeLanguages": {
      "javascript": "javascript",
      "javascriptreact": "javascriptreact",
      "plaintext": "html",
      "typescript": "typescript",
      "typescriptreact": "typescriptreact"
  },
}
```

## 🎨 Variables de Colores Tailwind y Sass

Las variables con nombres de los colores de **Sass** en `src/styles/global/variable.scss` y **Tailwind** en `src/styles/global/library/tailwind.css` tienen que ser exactamente los mismos

Esto garantiza que los colores sean los mismos entre los estilos globales definidos en Sass y los estilos de cada componente definidos con Tailwind.

****✅ Ejemplo:****

En Sass y Tailwind ambos colores tienen exactamente el mismo nombre `primary-color` y son el mismo color rojo `oklch(62.8% 0.258 29.23) `

```scss
// src/styles/global/variable.scss

// colores de Sass
$primary-color: oklch(62.8% 0.258 29.23) ;
```

[Documentación de variables de Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables)

```CSS
/*
src/styles/global/library/tailwind.css

colores de Tailwind */

@theme {
  --color-primary-color: oklch(62.8% 0.258 29.23) ;
}
```

## 🤔 ¿Cómo usar Tailwind y Sass juntos?

****❌ Incorrecto:****

Mezclar Sass y Tailwind en un mismo componente es mala práctica porque los estilos de Sass y Tailwind se sobrescriben debido a la especificidad, herencia y cascada de CSS.

Para los estilos esta prohibido lo siguiente:

* Los componentes de React **NO** deben tener archivos propios .scss ni .css

* CSS Modules (`.module.scss` / `.module.css`)

* Styled Components

* No puede existir un único archivo global de Sass donde se escriban directamente los estilos visuales de todos los componentes.

* `<style jsx global>`

* `<style>`

* Estilos en linea

****❌ Ejemplo incorrecto:****

```TSX
// MyComponent.tsx

export default function MyComponent() {
  return (
    <button id="btn-guardar" 
            className="bg-red-600">
      Guardar
    </button>
  );
}
```

```scss
// src/styles/global/global.scss

#btn-guardar {
  background-color: red;
}
```

***✅ Correcto:***

Sass para estilos globales en `src/styles/global/...`

Tailwind para estilos especificos de cada componente en `src/app/...` y `src/shared/components/...`

****✅ Ejemplo Correcto de Sass global:****

```scss
// src/styles/global/scroll-bar.scss

// ocultar barra de scroll, pero hacer q siga funcionando la barra de scroll
.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}
```

```TSX
// MyComponent1.tsx

export function MyComponent1() {
  return (
    <div className="hidden-scrollbar overflow-auto">
      ...
    </div>
  );
}
```

```TSX
// MyComponent2.tsx

export function MyComponent2() {
  return (
    <div className="hidden-scrollbar overflow-auto">
      ...
    </div>
  );
}
```

****✅ Ejemplo Correcto de Tailwind:****

```TSX
// MyComponent.tsx

export function MyComponent() {
  return (
    <button className="bg-red-600">
      Guardar
    </button>
  );
}
```

## 🖼️ Ruta de Iconos e Imagenes

Debes crear las siguientes carpetas:

```txt
public/
└── assets/
    ├── icon/
    └── img/
```

***✅ Correcto:***

Al usar las etiquetas `<img>` nativa de HTML y `<Image>` de Next JS, siempre utilizar rutas **absolutas** desde `/assets`.

```tsx
// MyComponent.tsx

import Image from "next/image";

export default function MyComponent() {
  return (
    <Image
      src="/assets/img/logo.png" /* usar slash al principio de /assets */
      alt="Logo"
      width={200}
      height={200}
    />
  );
}
```

***❌ Incorrecto***

**NO** usar rutas relativas para acceder a imágenes e iconos.

```tsx
// MyComponent.tsx

import Image from "next/image";

export default function MyComponent() {
  return (
    <Image
      src="../../../assets/img/logo.png" /* es incorrecto porque se escribe ../ */
      alt="Logo"
      width={200}
      height={200}
    />
  );
}
```

```tsx
// MyComponent.tsx

import Image from "next/image";

export default function MyComponent() {
  return (
    <Image
      src="assets/img/logo.png" /* es incorrecto porque NO se escribio el slash al principio de assets */
      alt="Logo"
      width={200}
      height={200}
    />
  );
}
```

### Imagenes

Las **imagenes** se tienen que guardar en `.`. 

```txt
public/assets/img/...
```

Ejemplo:

```TSX
// MyComponent.tsx

import Image from 'next/image';
import { FiHome } from "react-icons/fi";

export default function MyComponent() {
  return <Image src='/assets/img/my-image.jpg' alt='image' width={50} height={50} />
}
```

### Iconos

**NO** instales otra libreria para iconos porque en este proyecto es estandar usar [React Icons](https://react-icons.github.io/react-icons/)

Dar prioridad a usar los iconos de [React Icons](https://react-icons.github.io/react-icons/). Ejemplo:

```TSX
// MyComponent.tsx

import { FiHome } from "react-icons/fi";

export default function MyComponent() {
  return <FiHome />
}
```

No agregar imágenes/SVGs manualmente si el icono ya existe en [React Icons](https://react-icons.github.io/react-icons/)

Cuando el icono no este en [React Icons](https://react-icons.github.io/react-icons/), entonces agregarlo dentro de la carpeta `public/assets/icon/...`.

Los **iconos** del proyecto se deben guardar dentro de la carpeta 

```txt
public/assets/icon/...
```

Ejemplo:

```TSX
// MyComponent.tsx

import Image from 'next/image';
import { FiHome } from "react-icons/fi";

export default function MyComponent() {
  return <Image src='/assets/icon/icon.jpg' alt='icono' width={50} height={50} />
}
```

## 🔘 Estilos Globales para Botones

INCOMPLETO

AQUI ME FALTA COPIARME LA DOCUMENTACION Q TENGO DE ANGULAR PARA BOTONES Q ESTA BASADO EN BOOSTRAP