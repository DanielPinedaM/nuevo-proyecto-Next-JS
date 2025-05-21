import { IColumns } from "@/types/interface/interface-prime-react";

const columns: IColumns[] = [
  { field: "createdAt", header: "Fecha Creación" },
  { field: "table", header: "Tabla" },
  { field: "code", header: "Codigo" },
  { field: "category", header: "Categoria" },
  { field: "type", header: "Tipo" },
  { field: "city", header: "Ciudad" },
  { field: "country", header: "País" },
  { field: "email", header: "Correo" },
  { field: "phone", header: "Teléfono" },
  { field: "tag1", header: "Tag 1" },
  { field: "tag2", header: "Tag 2" },
];

export default columns;
