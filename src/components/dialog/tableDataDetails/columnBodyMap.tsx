/* eslint-disable @typescript-eslint/no-explicit-any */
const StatusReactIcon = dynamic(() => import("@/components/StatusIcon"));
import { IColumnData } from "@/models/interfaces/prime-react.interfaces";
import dynamic from "next/dynamic";

/**
Dar los siguientes formatos a los textos de las casillas de las tablas:
- mayusculas iniciales
- formato de fecha y hora
- agregar puntos suspensivos despues de X numero de caracteres */
const columnBodyMap: { [key: string]: (data: IColumnData) => React.ReactNode } = {
    NombreColumnaConBooleano: ({ NombreColumnaConBooleano }) => (
      <div className="flex justify-center items-center w-full h-full">
        {/* dependiendo de un booleano o texto muestra icono de ❌ ó ✅ */}
        <StatusReactIcon status={NombreColumnaConBooleano} />
      </div>
    ),
};

export default columnBodyMap;