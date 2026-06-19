import React, { forwardRef } from 'react';
import Link from 'next/link';

import { type ButtonVisualProps } from './data-types/interfaces/buttons.interface';
import composableButtonClass from './utils/composableButtonClass.utils';

type NextLinkButtonProps = ButtonVisualProps & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>;

/**
 * `NextLink` — botón composable construido sobre el componente `Link` de Next.js.
 *
 * Comparte exactamente la misma API visual que `Button` (theme, variant, size,
 * modifier, effect), pero renderiza un `<Link>` de Next.js en lugar de un `<button>`.
 *
 * Ideal para navegación interna de la aplicación con prefetch automático de Next.js
 * y apariencia de botón o enlace.
 *
 * Los estilos se aplican completamente mediante la arquitectura Sass global
 * ubicada en `src/styles/global/buttons/`.
 *
 * @example
 * // Link primario con fondo
 * <NextLink theme="primary" variant="background" href="/dashboard">
 *   Ir al Dashboard
 * </NextLink>
 *
 * @example
 * // Link tipo enlace (no requiere theme)
 * <NextLink variant="link" href="/home">
 *   Ir a Home
 * </NextLink>
 *
 * @example
 * // Link con icono y tamaño grande
 * <NextLink theme="info" variant="outline" size="lg" href="/profile">
 *   <MdPerson />
 *   <span>Mi Perfil</span>
 * </NextLink>
 *
 * @example
 * // Link circular solo icono
 * <NextLink
 *   theme="success"
 *   variant="background"
 *   modifier={['icon-only', 'rounded-full']}
 *   href="/notifications"
 * >
 *   <MdNotifications />
 * </NextLink>
 */
const NextLink = forwardRef<HTMLAnchorElement, NextLinkButtonProps>(
  (
    {
      theme,
      variant,
      size = 'base',
      modifiers,
      effects,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        className={composableButtonClass({ theme, variant, size, modifiers, effects })}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

NextLink.displayName = 'NextLink';

export default NextLink;
