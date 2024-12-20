/* eslint-disable @typescript-eslint/no-explicit-any */

/**
- Eliminar espacio en blanco ' ' al principio y final.
- Convertir a minuscula
- Reemplazar vocales con tilde por la misma vocal pero sin tilde.
- Reemplazar 'ñ' por 'n'
- Retornar el mismo parametro cuando NO sea tipo string. Ejemplo: (3) [1, 2, 3] retorna (3) [1, 2, 3] */

export const normalizeStr = (string: string | any): string | any => {
  if (typeof string === 'string' || string instanceof String) {
    return string.trim()
                 .toLowerCase()
                 .normalize('NFD')
                 .replaceAll(/[\u0300-\u036f]/g, '');
  } else {
    return string;
  }
};
