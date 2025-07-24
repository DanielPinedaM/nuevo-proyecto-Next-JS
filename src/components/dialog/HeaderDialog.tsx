import { ITitles } from '@/models/interfaces/prime-react.interfaces';
import { titleCase } from '@/utils/func/general';

/**
titulo <h1> y sub-titulo <h2> de TODAS las ventanas modales */
export default function HeaderDialog({ title, subtitle }: ITitles) {
  return (
    <>
      {title && <h1 className='text-center text-dark-pink'>{titleCase(title)}</h1>}

      {subtitle && <h2 className='text-center text-base text-dark-pink'>{titleCase(subtitle)}</h2>}
    </>
  );
}
