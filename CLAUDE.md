# Documentación de Next.js

@AGENTS.md

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

# Reglas de Idioma

- Responder siempre en español. Es decir, redactar en español todas las explicaciones, respuestas, preguntas, descripciones, análisis, recomendaciones, documentación y mensajes dirigidos al usuario.

- Mantener en español el razonamiento explicativo que se muestra al usuario para justificar una respuesta o decisión.

- El razonamiento explicativo es generado y mostrado únicamente a criterio de la IA cuando sea necesario para justificar o aclarar una respuesta o decisión. Cuando este razonamiento se muestre al usuario, debe estar redactado en español.

- No traducir términos técnicos de uso común en desarrollo de software (por ejemplo: middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload).

- No traducir nombres de frameworks, librerías, paquetes, APIs ni patrones de diseño.

- Mantener el código, identificadores, nombres de archivos, clases, interfaces, métodos, funciones y variables en inglés.

- Escribir el código en inglés, salvo las excepciones indicadas más abajo.

- Mantener en inglés los nombres de todas las carpetas del proyecto, salvo la excepción indicada en el siguiente punto.

- Como excepción a la regla anterior, escribir en español el nombre de las carpetas que definen una ruta URL del navegador en el App Router de Next.js, es decir, las carpetas que contienen un archivo `page.tsx` dentro de `src/app/(features)/<feature>` (por ejemplo, `iniciar-sesion` o `recuperar-clave`). El resto de carpetas, el nombre del archivo `page.tsx` y el nombre de la función o clase del componente asociado permanecen en inglés.
