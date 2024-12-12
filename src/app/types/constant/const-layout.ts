import { IBreakpoint, IGlobalTailwindStyle } from '../interface/interface-layout';

export const breakpoint: IBreakpoint = {
  // => @media (min-width: 480px) { ... }
  xsm: 480,

  // => @media (min-width: 640px) { ... }
  sm: 640,

  // => @media (min-width: 768px) { ... }
  md: 768,

  // => @media (min-width: 1024px) { ... }
  lg: 1024,

  // => @media (min-width: 1280px) { ... }
  xl: 1280,

  // => @media (min-width: 1536px) { ... }
  '2xl': 1536,

  // => @media (min-width: 1920px) { ... }
  '3xl': 1920,
};

export const globalTailwindStyle: IGlobalTailwindStyle = {
  button: 'bg-blue-600 font-medium text-white rounded-xl py-1 px-5 hover:opacity-75 hover:relative hover:bottom-[1px] hover:font-semibold',
  input: {
    general: 'border-2 rounded-md',
  },
};
