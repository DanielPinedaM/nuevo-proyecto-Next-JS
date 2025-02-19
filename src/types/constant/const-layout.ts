import { IBreakpoint, IGlobalTailwindStyle } from "@/types/interface/interface-layout";

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
  "2xl": 1536,

  // => @media (min-width: 1920px) { ... }
  "3xl": 1920,
};

export const globalTailwindStyle: IGlobalTailwindStyle = {
  button: {
    darkBlue: "bg-blue-700 font-medium text-white rounded-xl py-1 px-5 hover:opacity-75 hover:relative hover:bottom-[1px] hover:font-semibold",
    lightBlue: "bg-blue-200 font-medium text-white rounded-xl py-1 px-5 hover:opacity-75 hover:relative hover:bottom-[1px] hover:font-semibold",
    green: "bg-green-600 font-medium text-white rounded-xl py-1 px-5 hover:opacity-75 hover:relative hover:bottom-[1px] hover:font-semibold",
    red: "bg-red-600 font-medium text-white rounded-xl py-1 px-5 hover:opacity-75 hover:relative hover:bottom-[1px] hover:font-semibold",
  },
  input: {
    // estilo general para TODOS los input
    general: "border-2 rounded-md",
  },
  dialog: {
    container: {
      // <Dialog> contenedor de TODA la modal, borde externo q delinea la modal
      contour: "relative bg-white p-3 rounded-lg w-full",

      // <section> con el contenido principal de la modal
      content: "py-2",
    },
  },
};
