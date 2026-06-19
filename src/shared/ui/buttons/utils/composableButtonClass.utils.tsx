import clsx from 'clsx';

import {
  type ButtonEffect,
  type ButtonModifier,
  type ButtonSize,
  type ButtonTheme,
  type ButtonVariant,
} from '../data-types/interfaces/buttons.interface';

type ComposableButtonClassParams = {
  theme?: ButtonTheme;
  variant: ButtonVariant;
  size?: ButtonSize;
  modifier?: ButtonModifier | ButtonModifier[];
  effect?: ButtonEffect | ButtonEffect[];
  className?: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convierte un valor o un array de valores en un array */
function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];

  return Array.isArray(value) ? value : [value];
}

// ---------------------------------------------------------------------------
// composableButtonClass
// ---------------------------------------------------------------------------

export default function composableButtonClass({
  theme,
  variant,
  size = 'base',
  modifier,
  effect,
  className,
}: ComposableButtonClassParams): string {
  const modifiers: ButtonModifier[] = toArray(modifier);
  const effects = toArray(effect);

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
    modifiers.map((m) => `btn-${m}`),

    // ── Modificadores de efectos visuales ──────────────────────────────────────────────────
    effects.map((e) => `btn-${e}`),

    // ──  className proporcionado por el consumidor (siempre al final, máxima prioridad) ─────
    className
  );
}
