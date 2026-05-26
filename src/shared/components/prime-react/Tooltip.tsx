import { Tooltip as PrimeReactTooltip, TooltipProps } from "primereact/tooltip";

interface ITooltipProps {
  // nombre de la clase a la cual esta asociada el tooltip
  target: string;

  // texto del tooltip
  content?: string;

  // lugar donde se ubica el tooltip, undefined es automatico
  position?: TooltipProps["position"];
}

export default function Tooltip({
  target,
  content = "",
  position = undefined,
}: ITooltipProps) {
  return (
    <PrimeReactTooltip
      className='hidden xl:inline-block'
      target={`.${target}`}
      content={content ? content : ""}
      position={typeof position === "string" ? position : undefined}
    />
  );
}
