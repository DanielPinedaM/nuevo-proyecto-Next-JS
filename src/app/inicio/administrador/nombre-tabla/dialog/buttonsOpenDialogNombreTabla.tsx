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
        className="flex items-stretch justify-between border-[1px] border-gray-400 rounded-sm pl-2 w-[165px]"
        onClick={() => onClickOpenDialog("newTableDialog")}
      >
        <span className="text-dark-blue font-semibold uppercase">Nuevo</span>
        <div className="bg-dark-blue flex items-center justify-center rounded-[1px] w-6">
          <IoAdd className="text-white text-xl" />
        </div>
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
