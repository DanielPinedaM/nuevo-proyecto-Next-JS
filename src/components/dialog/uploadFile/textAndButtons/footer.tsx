import { globalTailwindStyle } from "@/types/constant/const-layout";
import { IFileUploadButtons } from "@/types/interface/interface-upload-file";

/**
botones q estan en la parte de abajo de la modal para guardar o cancelar subida de archivo */
export default function Footer({ onSubmit, onHide, isDragActive }: IFileUploadButtons) {
  return (
    <>
      {!isDragActive ? (
        <div className="flex justify-center gap-x-2">
          <button className="button-primary" onClick={onSubmit}>
            aceptar
          </button>

          <button className="button-secondary" onClick={onHide}>
            cancelar
          </button>
        </div>
      ) : (
        null
      )}
    </>
  );
}
