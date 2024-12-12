'use client';
import { ErrorMessage } from '@hookform/error-message';
import { IGeneralErrorMessage } from '../types/interface/interface-general-error-message';

/** * Componente que muestra los mensajes de error asociados a un campo de un formulario de React Hook Form */
export default function GeneralErrorMessage({ errors, name }: IGeneralErrorMessage) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p className='text-red-600' key={type}>
            {message}
          </p>
        ))
      }
    />
  );
}
