import clsx from 'clsx';

import {
  type ButtonEffect,
  type ButtonModifier,
  type ButtonSize,
  type ButtonTheme,
  type ButtonVariant,
} from '@/shared/ui/buttons/data-types/interfaces/buttons.interface';

type ComposableButtonClassParams = {
  theme?: ButtonTheme;
  variant: ButtonVariant;
  size?: ButtonSize;
  modifiers?: ButtonModifier[];
  effects?: ButtonEffect[];
};

export default function composableButtonClass({
  theme,
  variant,
  size = 'base',
  modifiers,
  effects,
}: ComposableButtonClassParams): string {
  return clsx(
    // ── Reset CSS para botón - requerido siempre ──────────────────────────────────────
    'btn',

    // ── Tema de color: .btn-primary, .btn-secondary, … ──────────────────────
    theme && `btn-${theme}`,

    // ── Variantes visuales: .btn-background, .btn-outline, .btn-ghost, .btn-link
    variant && `btn-${variant}`,

    // ── Tamaño: .btn-xs, .btn-sm, .btn-base (default), .btn-lg, … ──────────
    size && `btn-${size}`,

    // ── Modificadores de forma y diseño ──────────────────────────────────────────
    modifiers?.map((modifier) => `btn-${modifier}`),

    // ── Modificadores de efectos visuales ──────────────────────────────────────────────────
    effects?.map((effect) => `btn-${effect}`),
  );
}
