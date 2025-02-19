"use client";
import { IGeneralErrorMessage } from "@/types/interface/interface-general-error-message";
import { ErrorMessage } from "@hookform/error-message";

const generateUniqueKey = (): string =>  Math.random().toString(36).slice(2, 11);

/**
Componente que muestra los mensajes de error
asociados a un campo de un formulario de React Hook Form */
export default function GeneralErrorMessage({ errors, name }: IGeneralErrorMessage) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message], i) => (
          <>
            {message && (
              <p className="text-red-600" key={`${type}-${i}-${generateUniqueKey()}`}>
                {message}
              </p>
            )}
          </>
        ))
      }
    />
  );
}
