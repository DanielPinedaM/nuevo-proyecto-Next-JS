/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from 'primereact/dialog';
import HeaderDialog from '@/shared/components/dialog/HeaderDialog';
import { rowsPerPageOptions } from '@/shared/utils/func/general.utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import columnBodyMap from '@/shared/components/dialog/tableDataDetails/columnBodyMap';
import { IColumns, ITableDataDetailsDialog } from '@/shared/data-types/interfaces/prime-react.interfaces';
import { globalTailwindStyle } from '@/shared/data-types/constants/layout.const';
import visibleRows from '@/shared/data-types/constants/visible-rows.const';
import Button from '@/shared/ui/buttons/Button';

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
  title = '',
  subtitle = '',
}: ITableDataDetailsDialog) {
  const clearParameters = (): void => {
    tableData = [];
    columns = [];
    title = '';
    subtitle = '';
  };

  const onHide = (): void => {
    clearParameters();
    setVisible?.(false);
  };

  const Footer = () => {
    return (
      <div className='flex justify-center'>
        <Button
          theme="secondary"
          variant="outline"
          onClick={() => onHide()}
        >
          Cerrar
        </Button>
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
        stringCell !== '' &&
        cell !== null &&
        stringCell !== 'null' &&
        typeof cell !== 'undefined' &&
        stringCell !== 'undefined'
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
        .toSorted((a: IColumns, b: IColumns) => a.header.localeCompare(b.header, 'es-ES'))
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
      style={{ width: 'auto' }}
      className='min-w-[540px] max-w-[95vw]'
      onHide={onHide}
    >
      <section className={`${globalTailwindStyle.dialog.container.content}`}>
        {tableData && tableData?.length > 0 ? (
          <Table />
        ) : (
          <p className='text-center'>No hay datos</p>
        )}
      </section>
    </Dialog>
  );
}
