/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "primereact/datatable";
import { rowsPerPageOptions, titleCase } from "@/utils/func/general";
import { Column } from "primereact/column";
import visibleRows from "@/models/constants/visible-rows.constants";

/**
Muestra una tabla de forma dinamica,
sin importar q informacion tenga la tabla


la tabla NO esta anidada - tableDataDynamic es un array de objetos NO anidado */
export default function ListDynamicTable({ tableDataDynamic }: { tableDataDynamic: Record<string, any>[] }) {
  const Table = () => {
    const columns: string[] = Object?.keys(tableDataDynamic[0])?.toSorted((a, b) => a?.localeCompare(b, "es-ES"));

    return (
      <DataTable
        value={tableDataDynamic}
        paginator={tableDataDynamic.length > visibleRows}
        rows={visibleRows}
        totalRecords={tableDataDynamic.length}
        rowsPerPageOptions={rowsPerPageOptions(tableDataDynamic.length, visibleRows)}
      >
        {Array.isArray(columns) && columns?.length &&
          columns.map((item) => (
            <Column
              key={item}
              field={item}
              header={titleCase(item.replaceAll("_", " ").replaceAll("-", " "))}
              body={(data) => {
                const value: any = data[item];

                if (value === null || String(value).trim().toLowerCase() === "null") {
                  return <span>null</span>;
                } else if (typeof value === "object") {
                    return <span>{JSON.stringify(value)}</span>
                } else {
                  return <span>{String(value)}</span>;
                }
              }}
            />
          ))
        }
      </DataTable>
    );
  };

  return (
    <>
      {Array.isArray(tableDataDynamic) && tableDataDynamic?.length > 0 ? (
        <Table />
      ) : (
        <p className="text-center">No hay datos</p>
      )}
    </>
  );
}
