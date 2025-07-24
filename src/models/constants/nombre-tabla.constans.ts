import { IColumns, IDropdown } from '@/models/interfaces/prime-react.interfaces';

export const tables: IDropdown[] = [
  { label: 'Tabla 1', value: '1' },
  { label: 'Tabla 2', value: '2' },
  { label: 'Tabla 3', value: '3' },
];

export const constIsStandardGEL: IDropdown[] = [
  { label: 'Opcion 1', value: '1' },
  { label: 'Opcion 2', value: '2' },
  { label: 'Opcion 3', value: '3' },
];

export const constIsStandardMSPS: IDropdown[] = [
  { label: 'Opcion 4', value: '4' },
  { label: 'Opcion 5', value: '5' },
  { label: 'Opcion 6', value: '6' },
];

export const columns: IColumns[] = [
  { field: 'createdAt', header: 'Fecha Creación' },
  { field: 'table', header: 'Tabla' },
  { field: 'code', header: 'Codigo' },
  { field: 'category', header: 'Categoria' },
  { field: 'type', header: 'Tipo' },
  { field: 'city', header: 'Ciudad' },
  { field: 'country', header: 'País' },
  { field: 'email', header: 'Correo' },
  { field: 'phone', header: 'Teléfono' },
  { field: 'tag1', header: 'Tag 1' },
  { field: 'tag2', header: 'Tag 2' },
];
