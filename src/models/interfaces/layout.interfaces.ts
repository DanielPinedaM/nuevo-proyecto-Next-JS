export interface IBreakpoint {
  // => @media (min-width: 480px) { ... }
  xsm: number;

  // => @media (min-width: 640px) { ... }
  sm: number;

  // => @media (min-width: 768px) { ... }
  md: number;

  // => @media (min-width: 1024px) { ... }
  lg: number;

  // => @media (min-width: 1280px) { ... }
  xl: number;

  // => @media (min-width: 1536px) { ... }
  "2xl": number;

  // => @media (min-width: 1920px) { ... }
  "3xl": number;
}

export interface IGlobalTailwindStyle {
  input: {
    general: string;
  };
  dialog: {
    container: {
      content: string;
    };
  };
}
