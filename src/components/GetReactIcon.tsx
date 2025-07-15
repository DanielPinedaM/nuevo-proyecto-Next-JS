import { isString } from "@/utils/func/data-type.utils";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

type DynamicIconComponent = ComponentType<React.SVGProps<SVGSVGElement>>;

interface IGetReactIcon {
  icon: string;
  className?: string;
}

/**
Muestra un react icon de forma dinamica */
export default function GetReactIcon({ icon, className }: IGetReactIcon) {
  if (!isString(icon) || String(icon).trim() === "") {
    console.error(" ❌ error al mostrar react icon porque el nombre del icono tiene q ser tipo string y NO puede estar vacio\nicon ", icon, "\ntypeof icon ", typeof icon);
    return null;
  }

  const IconComponent: DynamicIconComponent | undefined = iconsMap[(icon ?? "").trim()];

  if (!IconComponent) {
    console.warn("⚠️ no se ha importado el react icon\nicon ", icon, "\ntypeof icon ", typeof icon, "\nIconComponent ", IconComponent, "\ntypeof IconComponent ", typeof IconComponent);
  }

  return IconComponent ? <IconComponent className={className ?? ""} /> : null;
}

const iconsMap: { [key: string]: DynamicIconComponent } = {
  BiCheckCircle: dynamic(() => import("react-icons/bi").then((mod) => mod.BiCheckCircle)),
};
