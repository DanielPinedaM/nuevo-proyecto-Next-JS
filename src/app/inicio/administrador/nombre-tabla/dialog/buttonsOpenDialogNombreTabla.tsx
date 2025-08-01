"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const IoAdd = dynamic(() => import("react-icons/io5").then((mod) => mod.IoAdd));
const NewTableDialog = dynamic(
  () => import("@/app/inicio/administrador/nombre-tabla/dialog/newtableDialog"),
  { ssr: false }
);

type TNameDialog = "newTableDialog";

export default function ButtonsOpenDialogNombreTabla() {
  const [visible, setVisible] = useState({
    uploadTable: false,
    newTableDialog: false,
  });

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

  const Dialog = () => (
    <>
      {/* guardar nueva fila en la tabla */}
      {visible.newTableDialog && (
        <NewTableDialog
          visible={visible.newTableDialog}
          setVisible={() => onCloseDialog("newTableDialog")}
        />
      )}
    </>
  );

  const Buttons = () => (
    <div className="flex gap-x-2">
      {/* guardar nueva fila en la tabla */}
      <button
        className="btn-with-icon-text-background"
        onClick={() => onClickOpenDialog("newTableDialog")}
      >
        <IoAdd />
         <span>Nuevo</span>
      </button>
    </div>
  );

  return (
    <>
      <Dialog />

      <Buttons />
    </>
  );
}
