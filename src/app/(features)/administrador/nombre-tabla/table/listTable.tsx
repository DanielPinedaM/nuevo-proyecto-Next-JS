"use client";
import { rowsPerPageOptions, titleCase, truncateString } from "@/shared/utils/func/general.utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import StatusReactIcon from "@/shared/components/StatusIcon";
import { formatDate } from "@/shared/utils/func/luxon.utils";
import errorNotification from "@/shared/components/dialog/notification/errorNotification";
import successNotification from "@/shared/components/dialog/notification/successNotification";
import infoNotification from "@/shared/components/dialog/notification/infoNotification";
import { useNavigationLoaderStore } from "@/shared/store/loader/navigationLoaderStore";
import { POST } from "@/shared/api/general-api/http-gateway.api";
import visibleRows from "@/shared/data-types/constants/visible-rows.const";
import { columns } from "@/app/(features)/administrador/nombre-tabla/models/constants/nombre-tabla.const";
import { ITableDataNombreTabla } from "@/app/(features)/administrador/nombre-tabla/models/interfaces/nombre-tabla.interfaces";
import Button from "@/shared/ui/buttons/Button";
const IoMdEye = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdEye));
const FaQuestion = dynamic(() => import("react-icons/fa").then((mod) => mod.FaQuestion));
const PrimeReactTooltip = dynamic(() => import("@/shared/components/prime-react/Tooltip"));
const TableDataDetailsDialog = dynamic(
  () => import("@/shared/components/dialog/tableDataDetails/TableDataDetailsDialog"),
  { ssr: false }
);
const QuestionNotification = dynamic(
  () => import("@/shared/components/dialog/notification/questionNotification"),
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
    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
      showLoaderNavigation();
      router.push("/iniciar-sesion");
    }
  }, []);

  useEffect(() => {
    console.info("fila actual a la q se le dio click ", tableData[currentRowIndex]);
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

    // peticion de ventana modal q hace una pregunta
    const { success } = await POST(`${process.env.NEXT_PUBLIC_}`);

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
            <span className={`tooltip-details-${rowIndex}`}>
              <Button
                variant="link"
                modifiers={['icon-only']}
                onClick={() => {
                  setCurrentRowIndex(rowIndex);
                  onClickOpenDialog("tableDataDetailsDialog");
                }}
              >
                <IoMdEye className="text-dark-blue text-xl" />
              </Button>
            </span>

            {/* hacer una pregunta al usuario */}
            <PrimeReactTooltip
              target={`tooltip-question-${rowIndex}`}
              content="Pregunta"
              position="right"
            />
            <span className={`tooltip-question-${rowIndex}`}>
              <Button
                variant="link"
                modifiers={['icon-only']}
                onClick={() => {
                  setCurrentRowIndex(rowIndex);
                  onClickOpenDialog("question");
                }}
              >
                <FaQuestion className="text-dark-blue text-xl" />
              </Button>
            </span>
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
