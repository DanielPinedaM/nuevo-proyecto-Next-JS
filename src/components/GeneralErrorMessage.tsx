"use client";
import { IGeneralErrorMessage } from "@/models/interfaces/general-error-message.interfaces";
import { ErrorMessage } from "@hookform/error-message";

const generateUniqueKey = (): string =>  Math.random().toString(36).slice(2, 11);

/**
Componente que muestra los mensajes de error
de los campos (input) de formulario de React Hook Form */
export default function GeneralErrorMessage({ errors, name }: IGeneralErrorMessage) {
  if (!errors || !name) return null;

  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message], i) => (
          <>
            {message && (
              <p className="text-red-600" 
                 key={`${type}-${i}-${generateUniqueKey()}`}>
               {message}
              </p>
            )}
          </>
        ))
      }
    />
  );
}
