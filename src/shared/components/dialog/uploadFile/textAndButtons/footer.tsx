import { IFileUploadButtons } from "@/shared/components/dialog/uploadFile/models/interfaces/upload-file.interfaces";


/**
botones q estan en la parte de abajo de la modal para guardar o cancelar subida de archivo */
export default function Footer({ onSubmit, onHide, isDragActive }: IFileUploadButtons) {
  return (
    <>
      {!isDragActive ? (
        <div className='flex justify-center gap-x-2'>
          <button className="btn btn-primary btn-background" onClick={onSubmit}>
            aceptar
          </button>

          <button className="btn btn-secondary btn-outline" onClick={onHide}>
            cancelar
          </button>
        </div>
      ) : null}
    </>
  );
}
