/**
formulario para crear una nueva tabla */
export interface IFormCreateTable {
  name: string;
  code: number;
  table: string | null;
  enabled: boolean;
  isStandardGEL: string | null;
  application: string | null;
  isStandardMSPS: string | null;
}

export interface ITableDataNombreTabla {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  updatedAt: string;
  createdAt: string;
  table: string;
  code: string;
  category: string;
  type: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  tag1: string;
  tag2: string;
}

export interface IGetTableNombreTabla {
  search: string;
}
