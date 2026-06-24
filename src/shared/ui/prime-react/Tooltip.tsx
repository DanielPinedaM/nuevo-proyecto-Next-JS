import { Tooltip as PrimeReactTooltip, TooltipProps } from 'primereact/tooltip';

interface ITooltipProps extends TooltipProps {
  // nombre de la clase a la cual esta asociada el tooltip
  target: string;
}
{
}

export default function Tooltip({
  target,
  content = '',
  position = undefined,
  className = 'hidden xl:inline-block',
  ...rest
}: ITooltipProps) {
  return (
    <PrimeReactTooltip
      {...rest}
      className={className}
      target={`.${target}`}
      content={content ? content : ''}
      position={typeof position === 'string' ? position : undefined}
    />
  );
}
