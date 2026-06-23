# Reglas de Idioma
* Responder siempre en español. Es decir, redactar en español todas las explicaciones, respuestas, preguntas, descripciones, análisis, recomendaciones, documentación y mensajes dirigidos al usuario.

* Mantener en español el razonamiento explicativo que se muestra al usuario para justificar una respuesta o decisión.

* El razonamiento explicativo es generado y mostrado únicamente a criterio de la IA cuando sea necesario para justificar o aclarar una respuesta o decisión. Cuando este razonamiento se muestre al usuario, debe estar redactado en español.

* No traducir términos técnicos de uso común en desarrollo de software (por ejemplo: middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload).

* No traducir nombres de frameworks, librerías, paquetes, APIs ni patrones de diseño.

* Mantener el código, identificadores, nombres de archivos, clases, interfaces, métodos, funciones y variables en inglés.

* Escribir el código en inglés, salvo las excepciones indicadas más abajo.

* Mantener en inglés los nombres de todas las carpetas del proyecto, salvo la excepción indicada en el siguiente punto.

* Como excepción a la regla anterior, escribir en español el nombre de las carpetas que definen una ruta URL del navegador en el App Router de Next.js, es decir, las carpetas que contienen un archivo `page.tsx` dentro de `src/app/(features)/<feature>` (por ejemplo, `iniciar-sesion` o `recuperar-clave`). El resto de carpetas, el nombre del archivo `page.tsx` y el nombre de la función o clase del componente asociado permanecen en inglés.

## Commits
### Fuente única de verdad para los commits
* La tabla de la sección "Emojis por Tipo de Commit" es la única fuente de verdad para construir cualquier commit. El tipo y el emoji deben seleccionarse exclusivamente desde sus filas.

* Antes de crear un commit, dar prioridad absoluta a la tabla: tomar siempre el tipo y el emoji desde ella.

* El uso de Conventional Commits y Gitmoji está estrictamente limitado a la tabla. Está prohibido usar tipos, emojis o definiciones que no aparezcan en ella.

* Está prohibido inventar nuevos tipos de commit, nuevos emojis o nuevas definiciones de commit.

* Si los cambios no encajan exactamente con ninguna fila de la tabla, está prohibido crear un tipo o un emoji nuevo. En ese caso, utilizar el tipo y el emoji existentes que más se aproximen a la intención real del cambio.

* Está prohibido eliminar, agregar, editar o alterar la tabla de la sección "Emojis por Tipo de Commit".

### Formato del Mensaje de Commit
`<emoji>` `<type>`(`<scope>`): `<mensaje en español>`

El `<emoji>` siempre va al inicio, antes del `<type>`. A continuación del encabezado, escribir siempre el `body` como una lista de puntos con los cambios realizados.

Elementos obligatorios en todo commit:

* `<emoji>`: tomado de la tabla.

* `<type>`: tomado de la tabla y escrito en inglés.

* El único elemento opcional es `<scope>`, regido por la sección "Reglas para el Scope".

* `<mensaje en español>`: resumen conciso de lo que se hizo (`subject`), redactado en español.

* `body`: explicación descriptiva de los cambios realizados, redactada en español como una lista de puntos, no como un párrafo. Es obligatorio en todo commit.

* El `body` nunca debe ser idéntico al `<mensaje en español>`. El `<mensaje en español>` resume el cambio, mientras que el `body` lo detalla punto por punto. Aunque el cambio sea muy pequeño y ambos puedan parecer similares, desarrollar el `body` con los puntos concretos del cambio en lugar de repetir el `<mensaje en español>`.

### Ejemplo
El encabezado es el `<emoji> <type>(<scope>): <mensaje en español>` y, debajo, el `body` desarrolla los cambios como lista de puntos.

```
✨ feat(auth): agregar validación de token JWT

- Validar la firma y la expiración del token JWT antes de permitir el acceso.
- Rechazar las peticiones con un token ausente o inválido.
- Agregar mensajes de error específicos para cada caso de validación.
```

En este ejemplo, las líneas que comienzan con `-` son el `body`: detallan punto por punto lo que resume el `<mensaje en español>` "agregar validación de token JWT", sin repetirlo literalmente.

### Emojis por Tipo de Commit

| Tipo de commit | Emoji | Descripción (definición)                                                                                          |
| ------------- | --- | -------------------------------------------------------------------------------------------------------------------- |
| feat          | ✨ | Nueva funcionalidad o capacidad del sistema                                                                           |
| fix           | 🐛 | Corrección de errores o fallos                                                                                        |
| hotfix        | 🚑 | Corrección urgente de errores críticos en producción                                                                  |
| docs          | 📝 | Cambios únicamente en documentación: archivos Markdown, README, carpeta docs, guías, manuales y contenido informativo |
| style         | 💄 | Cambios visuales, estilos, maquetación, UI/UX, responsive y textos visibles sin modificar lógica del negocio          |
| refactor      | ♻️ | Reestructuración del código sin cambiar comportamiento                                                                |
| perf          | ⚡ | Mejoras de rendimiento o eficiencia                                                                                   |
| test          | ✅ | Creación o modificación de pruebas                                                                                    |
| build         | 📦 | Cambios relacionados con build, compilación o empaquetado                                                             |
| ci            | 👷 | Cambios en integración continua o automatización de pipelines                                                         |
| chore         | 🔧 | Tareas de mantenimiento general que no modifican funcionalidad                                                        |
| revert        | ⏪ | Reversión de cambios, versiones o despliegues anteriores                                                              |
| docker        | 🐳 | Cambios relacionados con Docker, Kubernetes y contenedores                                                            |
| deps          | ⬆️ | Cambios relacionados con dependencias: agregar, actualizar o eliminar paquetes del proyecto                           |
| wip           | 🚧 | Trabajo en progreso no finalizado                                                                                     |
| init          | 🎉 | Inicialización del proyecto o configuración inicial                                                                   |
| merge         | 🔀 | Integración de ramas, combinación de cambios y resolución de conflictos de Git                                        |
| remove        | ⚰️ | Eliminación definitiva de código, archivos, carpetas, funcionalidades o dependencias que ya no son necesarias         |
| i18n          | 🌐 | Internacionalización o traducciones                                                                                   |
| lint          | 🚨 | Cambios relacionados con análisis estático, reglas de calidad de código y configuración de herramientas como ESLint   |
| accessibility | ♿ | Mejoras de accesibilidad                                                                                              |
| mock          | 🤡 | Cambios relacionados con mocks, datos simulados o datos quemados utilizados para pruebas y desarrollo                 |

### Reglas para el Scope
* El `<scope>` es opcional.

* Cuando se use, escribir el `<scope>` en inglés.

* Antes de omitirlo, intentar determinarlo revisando los archivos modificados, las rutas, los nombres de carpetas y los módulos o features afectados.

* Usar el `<scope>` únicamente cuando la funcionalidad, el módulo o el área modificada pueda identificarse de forma clara y directa.

* No inventar un `<scope>` basado en suposiciones.

* No invertir demasiado tiempo en deducir un `<scope>` ambiguo.

* Si tras revisar los cambios no hay información suficiente para determinarlo con seguridad, omitir el `<scope>`.

Flujo para determinar el `<scope>`:

1. Revisar los archivos modificados.

2. Identificar la feature, el módulo o el área afectada.

3. Validar que el `<scope>` represente realmente el cambio realizado.

4. Si el `<scope>` es claro, usarlo.

5. Si el `<scope>` genera duda, omitirlo.

### Regla Cuando el Cambio no Coincide Exactamente con la Tabla
* Nunca omitir el emoji.

* Priorizar la coherencia semántica sobre la coincidencia exacta: elegir el tipo y el emoji de la tabla que mejor representen la intención del cambio.

### Mostrar el Commit Después de Realizarlo
Cuando se solicite hacer un commit desde un prompt, después de crearlo mostrar en la respuesta el encabezado con el formato `<emoji>` `<type>`(`<scope>`): `<mensaje en español>` y el `body` correspondiente al commit realizado.
