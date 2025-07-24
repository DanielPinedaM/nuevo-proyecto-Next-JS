"use client";
import { listFormat } from "@/utils/func/general.utils";
import dynamic from "next/dynamic";
const MdOutlineFileUpload = dynamic(() =>
  import("react-icons/md").then((mod) => mod.MdOutlineFileUpload)
);

/**
Mensaje q explica al usuario ¿como subir los archivos? */
export default function UploadFile<T>({ allowedExtensions }: { allowedExtensions: T[] }) {
  return (
    <div className="w-fit cursor-pointer mx-auto">
      <div className="bg-dark-blue w-fit mx-auto rounded-sm">
        <MdOutlineFileUpload className="text-white text-7xl" />
      </div>

      <p className="text-center mx-auto w-fit">
        Arrastre y suelte sus archivos aquí o haga clic para seleccionarlos
      </p>
      <p className="text-center">Archivos: {listFormat(allowedExtensions)}</p>
    </div>
  );
}
