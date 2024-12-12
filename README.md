# Next JS 15 + React 19

#### Instalar paquetes

```javascript
nvm install 22.12.0
```

```javascript
nvm use 22.12.0
```

```javascript
npm i
```

#### Ejecutar proyecto

```javascript
nvm use 22.12.0
```

comando | apunta a... | ruta archivo
------------ | ------------- | -------------
node --run start:dev | localhost | environment.development.ts
node --run start:test | pruebas | environment.test.ts
node --run start:prod | producción | environment.ts

#### Generar build (dist) para desplegar

```javascript
nvm use 22.12.0
```

comando | apunta a... | ruta archivo
------------ | ------------- | -------------
node --run build:test | pruebas | src/environments/environment.test.ts
node --run build:prod | producción | src/environments/environment.ts

#### Tecnologías

* **NextJS:** usa la sintaxis de React y las peticiones son server side rendering

* **TypeScript:** tipado de datos

* **Turbopack:** es el empaquetador de Next, sirve para ejecutar Next en desarrollo (local)

* **Tailwind y Sass:** estilos y maquetado

* **Zustand:** estado global

* **Prime React:** librería de UI, sirve para tablas, input, etc

* **React hook form:** manejo de formularios

* **react icons:** Iconos de React

#### Maquetación
* Todos los componentes **no** pueden tener archivos de Sass, se tiene que maquetar en Tailwind.

* Mezclar Sass con Tailwind es mala práctica porque Sass sobrescribe los estilos de Tailwind porque Sass tiene más especificidad que Tailwind.

* Los únicos archivos de Sass tienen que ser globales y estar en ```src/app/scss/global```.

#### Estructura de módulos
* **src/app/components**: Componentes generales que se pueden re-utilizar en cualquier parte de la aplicacion

* **src/app/componentsp/GeneralErrorMessage.tsx**: Componente que muestra los mensajes de error asociados a un campo de un formulario de React Hook Form

* **src/app/scss**: Estilos globales de Sass

* **src/app/types/constant**: Constantes

* **src/app/types/interface**: Interface asociadas a las constantes

* **src/app/utils/func/general.ts**: Funciones generalres que se pueden re-utilizar en cualquier parte de la aplicacion

* **src/app/utils/func/sessionStorage.ts**: Funciones para guardar, listar, actualizar y eliminar propiedad:valor en sessionStorage, codifica y de-codifica en base 64, detecta cuando usar JSON.stringify() y JSON.parse()

* **public/assets/icon**: Iconos

* **public/assets/img**: Imagenes

* **src/app/store**: Estado global en Zustand para compartir estados entre componentes

* **src/app/api/generalServiceHttp.ts**: Funcion general para hacer peticiones HTTP usando fetch, sirve para Server Side Rendering y "use client"