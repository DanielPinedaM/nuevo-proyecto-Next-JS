/**
lugar donde se ubican las partes de la grafica */
export type TOrient = "horizontal" | "vertical";
export type TLeft = "left" | "center" | "right";
export type TTop = "top" | "middle" | "bottom";
export type IPosition = "top" | "bottom" | "left" | "right" | "insideLeft" | "inside" | "middle" | "start" | "end" | "center";
export type TAlign = "top" | "bottom" | "left" | "right" ;

/**
negrilla */
export type TFontWeight = number | "normal" | "bold" | "bolder" | "lighter";

/**
tipos de graficas q puede mostrar el componente <ChartComponent> */
export const chartTypes: string[] = ["pie", "bar", "line", "polarArea", "radar"] as const;
export type ChartType = (typeof chartTypes)[number];

export type TType = "category";

/**
forma de la grafica de radar */
export type TShape = "polygon" | "circle";
