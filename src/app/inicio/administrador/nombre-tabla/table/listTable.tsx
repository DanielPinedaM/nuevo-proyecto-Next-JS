"use client";
import { constPath } from "@/types/constant/const-path";
import { rowsPerPageOptions, titleCase, truncateString } from "@/utils/func/general";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import StatusReactIcon from "@/components/reactIcons/StatusIcon";
import { formatDate } from "@/utils/func/luxon";
import { IResponse } from "@/services/generalService/types/requestDataTypes";
import errorNotification from "@/components/dialog/notification/errorNotification";
import successNotification from "@/components/dialog/notification/successNotification";
import infoNotification from "@/components/dialog/notification/infoNotification";
import visibleRows from "@/types/constant/const-visible-rows";
import { ITableDataNombreTabla } from "@/types/interface/interface-nombre-tabla";
import columns from "@/types/constant/const-columns-nombre-tabla";
import { acceptValidation } from "@/services/table-name";
import { useNavigationLoaderStore } from "@/store/loader/navigationLoaderStore";
const IoMdEye = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdEye));
const FaQuestion = dynamic(() => import("react-icons/fa").then((mod) => mod.FaQuestion));
const PrimeReactTooltip = dynamic(() => import("@/components/PrimeReactTooltip"));
const TableDataDetailsDialog = dynamic(
  () => import("@/components/dialog/tableDataDetails/TableDataDetailsDialog"),
  { ssr: false }
);
const QuestionNotification = dynamic(
  () => import("@/components/dialog/notification/questionNotification"),
  { ssr: false }
);

type TNameDialog = "tableDataDetailsDialog" | "question";

export default function ListTable({ tableData }: { tableData: ITableDataNombreTabla[] }) {
  const { showLoaderNavigation } = useNavigationLoaderStore();
  const router = useRouter();

  const [visible, setVisible] = useState({
    tableDataDetailsDialog: false,
    question: false,
  });

  // guardar el indice actual de la fila a la cual se dio click
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(-1);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
      showLoaderNavigation();
      router.push(`/${constPath.login}`);
    }
  }, []);

  useEffect(() => {
   console.info("fila actual a la q se le dio click ", tableData[currentRowIndex])
  }, [tableData, currentRowIndex]);


  const onClickOpenDialog = (nameDialog: TNameDialog): void => {
    setVisible((prev) => ({
      ...prev,
      [nameDialog]: true,
    }));
  };

  const onCloseDialog = (nameDialog: TNameDialog): void => {
    setVisible((prev) => ({
      ...prev,
      [nameDialog]: false,
    }));
  };

  const onClickAccept = async (): Promise<void> => {
    infoNotification("aceptar");

    const { success }: IResponse = await acceptValidation();

    if (success) {
      successNotification("Diste click en boton aceptar");
    } else {
      errorNotification("Ocurrio un error");
    }
  };

  const onClickCancel = () => {
    infoNotification("cancelar");
  };

  const Dialog = () => (
    <>
      {/* ver el resto de las columnas de la fila actual a la cual se le dio click */}
      {visible.tableDataDetailsDialog && (
        <TableDataDetailsDialog
          visible={visible.tableDataDetailsDialog}
          setVisible={() => onCloseDialog("tableDataDetailsDialog")}
          tableData={[tableData[currentRowIndex]]}
          columns={columns}
          title={`Columnas Adicionales de la Fila Seleccionada ${currentRowIndex}`}
        />
      )}

      {/* hacer una pregunta al usuario */}
      {visible.question && (
        <QuestionNotification
          visible={visible.question}
          setVisible={() => onCloseDialog("question")}
          message={"Seguro que desea hacer X cosa"}
          onClickAccept={onClickAccept}
          onClickCancel={onClickCancel}
        />
      )}
    </>
  );

  const Table = () => (
    <DataTable
      value={tableData}
      paginator={tableData.length > visibleRows}
      rows={visibleRows}
      totalRecords={tableData.length}
      rowsPerPageOptions={rowsPerPageOptions(tableData.length, visibleRows)}
    >
      <Column
        header="Acciones"
        body={(_, { rowIndex }) => (
          <div className="flex w-full h-full gap-x-1">
            {/* ver mas columnas de la fila Seleccionada */}
            <PrimeReactTooltip
              target={`tooltip-details-${rowIndex}`}
              content="Ver más columnas"
              position="right"
            />
            <button
              className={`tooltip-details-${rowIndex} flex items-center`}
              onClick={() => {
                setCurrentRowIndex(rowIndex);
                onClickOpenDialog("tableDataDetailsDialog");
              }}
            >
              <IoMdEye className="text-dark-blue text-xl" />
            </button>

            {/* hacer una pregunta al usuario */}
            <PrimeReactTooltip
              target={`tooltip-question-${rowIndex}`}
              content="Pregunta"
              position="right"
            />
            <button
              className={`tooltip-question-${rowIndex} flex items-center`}
              onClick={() => {
                setCurrentRowIndex(rowIndex);
                onClickOpenDialog("question");
              }}
            >
              <FaQuestion className="text-dark-blue text-xl" />
            </button>
          </div>
        )}
      />
      <Column field="id" header="Identificación"></Column>
      <Column field="name" header="Nombre" body={({ name }) => titleCase(name)}></Column>
      <Column
        field="description"
        header="Descripción"
        body={({ description }) => truncateString(description, 16)}
      ></Column>
      <Column
        field="enabled"
        header="¿Habilitado?"
        body={({ enabled }) => (
          <div className="flex justify-center items-center w-full h-full">
            <StatusReactIcon status={enabled} />
          </div>
        )}
      ></Column>
      <Column
        field="updatedAt"
        header="Fecha Actualizacion"
        body={({ updatedAt }) => formatDate(updatedAt)}
      ></Column>
    </DataTable>
  );

  return (
    <>
      <Dialog />

      <Table />
    </>
  );
}
