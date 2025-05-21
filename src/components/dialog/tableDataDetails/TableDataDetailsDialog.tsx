/* eslint-disable @typescript-eslint/no-explicit-any */
import { globalTailwindStyle } from "@/types/constant/const-layout";
import { IColumns, ITableDataDetailsDialog } from "@/types/interface/interface-prime-react";
import { Dialog } from "primereact/dialog";
import HeaderDialog from "../HeaderDialog";
import { rowsPerPageOptions } from "@/utils/func/general";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import columnBodyMap from "./columnBodyMap";
import visibleRows from "@/types/constant/const-visible-rows";

type TCell = string | boolean | null | undefined | Date | number | object | any[];

/**
* - Abre una ventana modal q muestra una tabla
- Solamente sirve para listar informacion en tabla
- Se usa para boton de "ver mas"
- La tabla puede tener una sola o mas FILAS
- La tabla puede tener una sola o mas COLUMNAS */
export default function TableDataDetailsDialog({
  visible,
  setVisible,
  tableData = [],
  columns = [],
  title = "",
  subtitle = "",
}: ITableDataDetailsDialog) {
  const clearParameters = (): void => {
    tableData = [];
    columns = [];
    title = "";
    subtitle = "";
  };

  const onHide = (): void => {
    clearParameters();
    setVisible?.(false);
  };

  const Footer = () => {
    return (
      <div className="flex justify-center">
        <button
          onClick={() => {
            onHide();
          }}
          className={`${globalTailwindStyle.button.darkBlue}`}
        >
          Cerrar
        </button>
      </div>
    );
  };

  /**
   * NO mostrar las columnas q contengan TODAS las casillas vacias */
  const allTruthy = (field: string): boolean =>
    tableData.every((row) => {
      const cell: TCell = row[field];
      const stringCell: string = String(cell)?.trim();

      return (
        stringCell !== "" &&
        cell !== null &&
        stringCell !== "null" &&
        typeof cell !== "undefined" &&
        stringCell !== "undefined"
      );
    });

  const Table = () => (
    <DataTable
      value={tableData}
      paginator={tableData.length > visibleRows}
      rows={visibleRows}
      totalRecords={tableData.length}
      rowsPerPageOptions={rowsPerPageOptions(tableData.length, visibleRows)}
    >
      {columns
        .toSorted((a: IColumns, b: IColumns) => a.header.localeCompare(b.header, "es-ES"))
        .map(({ field, header }, i: number) => {
          return allTruthy(field) ? (
            <Column
              key={i}
              field={field}
              header={header}
              body={(data) =>
                columnBodyMap[field] ? columnBodyMap[field](data) : <p>{String(data[field])}</p>
              }
            />
          ) : null;
        })}
    </DataTable>
  );

  return (
    <Dialog
      header={<HeaderDialog title={title} subtitle={subtitle} />}
      footer={Footer}
      visible={visible}
      draggable={false}
      style={{ width: "auto" }}
      className={`${globalTailwindStyle.dialog.container.contour} min-w-[540px] max-w-[95vw]`}
      onHide={onHide}
    >
      <section className={`${globalTailwindStyle.dialog.container.content}`}>
        {tableData && tableData?.length > 0 ? (
          <Table />
        ) : (
          <p className="text-center">No hay datos</p>
        )}
      </section>
    </Dialog>
  );
}
