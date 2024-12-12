import { breakpoint } from "./src/app/types/constant/const-layout";
import type { Config } from "tailwindcss";


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // => @media (min-width: 480px) { ... }
      xsm: `${breakpoint.xsm}px`,
 
      // => @media (min-width: 640px) { ... }
      sm: `${breakpoint.sm}px`,
 
      // => @media (min-width: 768px) { ... }
      md: `${breakpoint.md}px`,
 
      // => @media (min-width: 1024px) { ... }
      lg: `${breakpoint.lg}px`,
 
      // => @media (min-width: 1280px) { ... }
      xl: `${breakpoint.xl}px`,
 
      // => @media (min-width: 1536px) { ... }
      "2xl": `${breakpoint["2xl"]}px`,
 
      // => @media (min-width: 1920px) { ... }
      "3xl": `${breakpoint["3xl"]}px`,
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
