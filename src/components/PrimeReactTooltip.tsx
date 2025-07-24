
import { IPrimeReactTooltip } from "@/models/interfaces/prime-react.interfaces";
import { Tooltip } from "primereact/tooltip";

export default function PrimeReactTooltip({
  target,
  content = "",
  position = undefined,
}: IPrimeReactTooltip) {
  return (
    <Tooltip
      className='hidden xl:inline-block'
      target={`.${target}`}
      content={content ? content : ""}
      position={typeof position === "string" ? position : undefined}
    />
  );
}
