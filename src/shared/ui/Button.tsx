import { forwardRef, ReactNode, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

// ---------------------------------------------------------------------------
// Tipos — derivados de la arquitectura Sass en src/styles/global/buttons/
// ---------------------------------------------------------------------------

/** Colores con temas de boton — se asigna con .btn-{theme} dependiendo de _themes.scss */
type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

/** variantes visuales — se asigna con .btn-{variant} dependiendo de _variants.scss */
type ButtonVariant = 'background' | 'outline' | 'ghost' | 'link';

/** tamaño — se asigna con .btn-{size} dependiendo de  _sizes.scss */
type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

/** Modificadores de diseño/forma — se asigna con .btn-{modifier} dependiendo de _modifiers.scss */
type ButtonModifier = 'full-width' | 'rounded-full' | 'icon-only';

/** Modificadores de efectos visuales — se asigna con .btn-{effect} dependiendo de  _effects.scss */
type ButtonEffect = 'shadow';

// ---------------------------------------------------------------------------
// Base props
// ---------------------------------------------------------------------------

type BaseProps = {
  /**
   * Tamaño del botón.
   * Por defecto es `'base'` cuando no se especifica (equivalente a `.btn-base`).
   * se asigna con `.btn-{size}` dependiendo de `_sizes.scss` */
  size?: ButtonSize;

  /**
   * Modificadores de forma / layout.
   * - `'rounded-full'` → esquinas completamente redondeadas / forma circular
   * - `'full-width'`   → boton se expande para ocupar todo el ancho del contenedor
   * - `'icon-only'`    → relación de aspecto cuadrada para botones que solo contienen icono - es obligatorio agregar 'icon-only' cuando boton solamente contiene icono
   *
   * Corresponde a `.btn-rounded-full`, `.btn-full-width`, `.btn-icon-only`
   * en `_modifiers.scss`.
   *
   * Se pueden combinar múltiples modificadores: `['rounded-full', 'icon-only']` */
  modifier?: ButtonModifier | ButtonModifier[];

  /**
   * Modificadores de efectos visuales.
   * - `'shadow'` → agrega una sombra tipo elevación (Material Design)
   *
   * Corresponde a `.btn-shadow` en `_effects.scss`.
   *
   * Se pueden combinar múltiples efectos: `['shadow']` */
  effect?: ButtonEffect | ButtonEffect[];

  /**
   * Contenido del botón.
   * Todo el contenido visual — texto, iconos o combinaciones — debe pasarse
   * a través de `children`.
   * NO se deben usar las props `label` o `icon` (patrón de PrimeReact
   * explícitamente excluido por los requisitos del proyecto).
   *
   * Ejemplos:
   *   <Button theme="primary" variant="background">Guardar</Button>
   *   <Button theme="danger" variant="outline"><MdDelete /><span>Eliminar</span></Button>
   *   <Button theme="info" variant="background" modifier="icon-only"><MdInfo /></Button> */
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// ---------------------------------------------------------------------------
// CASO NORMAL - boton - botones de acción estándar del sistema
// ---------------------------------------------------------------------------
/**
 Se utiliza para TODOS los botones que representan una acción del sistema:
- Confirmar
- Cancelar
- Acciones CRUD

Estos botones SIEMPRE tienen dos dimensiones (props) de diseño:
1. theme   → define el significado del color (primary, danger, success, etc.)
2. variant → define la apariencia visual (background, outline, ghost)

🔥 IMPORTANTE:
En este caso el botón NO puede existir sin theme,
porque el color es parte del significado de la acción.

Ejemplo:

import { MdCheckCircle } from "react-icons/md";

<Button theme="success" variant="background">
  <MdCheckCircle />
  <span>Confirmar</span>
</Button>
*/
type StandardButtonProps = BaseProps & {
  /**
   * Estilo visual del botón.
   * - `'background'` → relleno con `--btn-color`
   * - `'outline'`    → fondo transparente, borde con color
   * - `'ghost'`      → sin fondo ni borde, relleno sutil en hover
   * - `'link'`       → estilo tipo enlace con subrayado y sin padding
   *
   * Corresponde a `.btn-background`, `.btn-outline`, `.btn-ghost`, `.btn-link`
   * en `_variants.scss`. */
  variant: Exclude<ButtonVariant, 'link'>;

  /**
   * Tema de color del botón.
   * Define el significado semántico del botón (primary, danger, success, etc.).
   *
   * Corresponde al bloque de custom properties CSS `.btn-{theme}` en `_themes.scss`.
   *
   * ⚠️ IMPORTANTE:
   * Este valor es obligatorio en botones de acción "CASO NORMAL - boton"
   * y está prohibido en botones tipo `link` "CASO LINK (botón de navegación / estilo enlace"
   * ya que estos no representan acciones del sistema. */
  theme: ButtonTheme;
};

// ---------------------------------------------------------------------------
// CASO LINK (botón de navegación / estilo enlace)
// ---------------------------------------------------------------------------

/**
este caso es DIFERENTE al de "CASO NORMAL - boton"

Se usa para:
- navegación
- links internos (Next.js Link)
- acciones discretas tipo texto clickeable

Este botón NO es una acción del sistema,
es una representación de un enlace.

Por eso:
NO necesita theme (no tiene semántica de color)
NO usa background ni outline
NO compite visualmente con botones de acción

el estilo "link" ya define todo su comportamiento visual

Ejemplo:

"use client";

import { useRouter } from "next/navigation";

export function MyComponent() {
  const router = useRouter();

  return (
    <Button
      variant="link"
      onClick={() => router.push("/home")}
    >
      Ir a Home
    </Button>
  );
} */
type LinkButtonProps = BaseProps & {
  variant: 'link';
  theme?: never;
};

// ---------------------------------------------------------------------------
// Unión final
// ---------------------------------------------------------------------------

type ButtonProps = StandardButtonProps | LinkButtonProps;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convierte un valor o un array de valores en un array */
function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];

  return Array.isArray(value) ? value : [value];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `Button` — componente base composable para botones.
 *
 * Construido sobre el elemento nativo `<button>`, sin dependencias de PrimeReact.
 * Los estilos se aplican completamente mediante la arquitectura Sass global
 * ubicada en `src/styles/global/buttons/`.
 *
 * La API está inspirada en el componente Button de PrimeReact:
 * https://primereact.org/button/
 *
 * @example
 * // Botón primario con fondo
 * <Button theme="primary" variant="background">
 *   Guardar
 * </Button>
 *
 * @example
 * // Botón danger con borde, tamaño grande y sombra
 * <Button theme="danger" variant="outline" size="lg" effect="shadow">
 *   <MdDelete />
 *   <span>Eliminar</span>
 * </Button>
 *
 * @example
 * // Botón circular solo icono
 * <Button
 *   theme="success"
 *   variant="background"
 *   modifier={['icon-only', 'rounded-full']}
 * >
 *   <MdCheckCircle />
 * </Button>
 *
 * @example
 * // Botón ghost de ancho completo
 * <Button
 *   theme="secondary"
 *   variant="ghost"
 *   modifier="full-width"
 * >
 *   Cancelar
 * </Button>
 *
 * @example
 * // Botón tipo enlace (no requiere theme)
 * <Button variant="link">
 *   Ir al inicio
 * </Button>
 *
 * @example
 * // Estado deshabilitado usando el atributo HTML nativo
 * <Button
 *   theme="primary"
 *   variant="background"
 *   disabled
 * >
 *   Procesando...
 * </Button> */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      theme,
      variant,
      size = 'base',
      modifier,
      effect,
      children,
      className,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const modifiers: ButtonModifier[] = toArray(modifier);
    const effects = toArray(effect);

    const composableClassName: string = clsx(
      // ── Reset CSS para boton - requerido siempre ──────────────────────────────────────
      'btn',

      // ── Tema de color: .btn-primary, .btn-secondary, … ──────────────────────
      theme && `btn-${theme}`,

      // ── Variantes visuales: .btn-background, .btn-outline, .btn-ghost, .btn-link
      variant && `btn-${variant}`,

      // ── Tamaño: .btn-xs, .btn-sm, .btn-base (default), .btn-lg, … ──────────
      size && `btn-${size}`,

      // ── Modificadores de forma y diseño ──────────────────────────────────────────
      modifiers.map((m) => `btn-${m}`),

      // ── Modificadores de efectos visuales ──────────────────────────────────────────────────
      effects.map((e) => `btn-${e}`),

      // ──  className proporcionado por el consumidor (siempre al final, máxima prioridad) ─────
      className
    );

    return (
      <button
        ref={ref}
        /**
         * Los botones con `variant="link"` siempre utilizan `type="button"`.
         *
         * Esto evita comportamientos inesperados dentro de formularios,
         * ya que un botón visualmente representado como enlace no debe
         * ejecutar envíos (`submit`) ni acciones de formulario.
         *
         * Para el resto de variantes se utiliza el valor de `type`
         * proporcionado por el consumidor. Si no se especifica, el valor
         * por defecto es `'button'` */
        type={variant === 'link' ? 'button' : type}
        className={composableClassName}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
