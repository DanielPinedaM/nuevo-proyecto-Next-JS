import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { type ButtonVisualProps } from './data-types/interfaces/buttons.interface';
import composableButtonClass from './utils/composableButtonClass.utils';

type ButtonProps = ButtonVisualProps & ButtonHTMLAttributes<HTMLButtonElement>;

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
 * </Button>
 */
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
    return (
      <button
        ref={ref}
        // variant="link" fuerza type="button" para no enviar formularios accidentalmente
        type={variant === 'link' ? 'button' : type}
        className={composableButtonClass({ theme, variant, size, modifier, effect, className })}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
