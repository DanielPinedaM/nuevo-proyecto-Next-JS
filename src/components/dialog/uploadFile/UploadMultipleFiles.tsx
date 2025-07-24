/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Header from "@/components/dialog/HeaderDialog";
import errorNotification from "@/components/dialog/notification/errorNotification";
import successNotification from "@/components/dialog/notification/successNotification";
import DragAndDrop from "@/components/dialog/uploadFile/textAndButtons/dragAndDrop";
import Footer from "@/components/dialog/uploadFile/textAndButtons/footer";
import ListFiles from "@/components/dialog/uploadFile/textAndButtons/listFiles";
import UploadFile from "@/components/dialog/uploadFile/textAndButtons/uploadFile";
import { globalTailwindStyle } from "@/models/constants/layout.constants";
import { IUploadFile } from "@/models/interfaces/upload-file.interfaces";
import { IResponse } from "@/services/generalService/types/request-data.types";
import {
  uploadOneOrMoreFilesByBody,
  uploadOneOrMoreFilesByParams,
  uploadOneOrMoreFilesWithoutId,
} from "@/services/upload-file.service";
import { validateId, validateMultipleFiles } from "@/utils/func/file/fileValidations.utils";
import { clsx } from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
const MdDeleteSweep = dynamic(() => import("react-icons/md").then((mod) => mod.MdDeleteSweep));

/**
componente con ventana modal para subir UNO O MAS archivos */
export default function UploadMultipleFiles({
  sendId,
  url,
  allowedExtensions,
  NestedDialog,
  title,
  subtitle,
  visible,
  setVisible,
}: IUploadFile) {
  const router = useRouter();

  const [visibleNestedDialog, setVisibleNestedDialog] = useState<boolean>(false);
  const [dataDialog, setDataDialog] = useState<any | null>();

  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);

  // referencia: actualizar los archivos actuales la primera vez q el usuario los intenta cargar
  const acceptedFilesRef = useRef<FileWithPath[]>(acceptedFiles);

  const onDrop = useCallback(
    (files: FileWithPath[]) => {
      const hasError: boolean = validateMultipleFiles({
        files,
        previousFiles: acceptedFilesRef.current, // Referencia de archivos anteriores
        acceptedFiles,
        allowedExtensions,
      });
      if (hasError) return;

      // guardar UNO O MAS archivos
      setAcceptedFiles((prev) => {
        // actualizar tanto el estado como la referencia
        const updatedFiles = [...prev, ...files];
        acceptedFilesRef.current = updatedFiles;
        return updatedFiles;
      });
    },
    [acceptedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  /**
  re-frescar datos y ocultar modal subir archivo:
  - cuando la peticion http es exitosa
  - despues de q la API response
  - despues de cerrar ventana modal anidada */
  const refreshData = () => {
    if (dataDialog && NestedDialog && !visibleNestedDialog) {
      router.refresh();
      onHide();
    }
  };

  useEffect(() => {
    refreshData();
  }, [dataDialog, NestedDialog, visibleNestedDialog]);

  const clearStates = (): void => {
    setAcceptedFiles([]);
    acceptedFilesRef.current = [];
  };

  const onClickDeleteAllFiles = (): void => {
    clearStates();
    successNotification("Se han eliminado todos los archivos");
  };

  const onClickDeleteFile = (indexSearched: number): void => {
    if (typeof indexSearched !== "number") {
      errorNotification("Ocurrio un error al eliminar archivo");
      return;
    }

    setAcceptedFiles((prevFiles: FileWithPath[]) => {
      // eliminar indice especifico en array de objetos
      const updatedFiles: FileWithPath[] = prevFiles.filter(
        (_, currentIndex: number) => currentIndex !== indexSearched
      );

      // Actualizar la referencia para reflejar el nuevo estado
      acceptedFilesRef.current = updatedFiles;

      return updatedFiles;
    });

    successNotification(`Archivo ${acceptedFiles[indexSearched]?.name} eliminado`);
  };

  const onHide = (): void => {
    clearStates();
    setVisible?.(false);
  };

  const onSubmit = async (): Promise<void> => {
    if (validateId(sendId)) return;

    const hasError: boolean = validateMultipleFiles({ files: acceptedFiles });
    if (hasError) return;

    // formData contiene los archivos y es el body de la peticion http
    const formData = new FormData();

    // agregar archivos
    acceptedFiles.forEach((currentFile: FileWithPath) => {
      formData.append("file", currentFile, currentFile?.name);
    });

    let _response: IResponse;

    if (sendId?.id && sendId?.sendBy === "params") {
      // enviar ID por PARAMS URL
      _response = await uploadOneOrMoreFilesByParams({
        file: formData,
        paramsId: sendId.id,
        url,
      });
    } else if (sendId?.id && sendId?.sendBy === "body") {
      // enviar ID por BODY
      formData.append(sendId.nameId as string, sendId.id.toString());

      _response = await uploadOneOrMoreFilesByBody({
        file: formData,
        url,
      });
    } else {
      // NO enviar ID
      _response = await uploadOneOrMoreFilesWithoutId({
        file: formData,
        url,
      });
    }

    setDataDialog(structuredClone(_response.data));

    const { success, status, message } = _response;

    // abrir otra modal encima de modal subir archivo
    if (NestedDialog) {
      setVisibleNestedDialog(true);
    }

    if (success) {
      successNotification("Archivos subidos");

      if (!NestedDialog) {
        /* re-frescar datos y ocultar modal subir archivo:
        - cuando la peticion http es exitosa
        - cuando NO se abre ventana modal anidada */
        router.refresh();
        onHide();
      }
    } else {
      if (status === 404) {
        console.error(
          "UploadMultipleFiles.tsx - solución al error:  \n 1) Puede q la URL sea invalida \n 2) Estas enviando mal los props al componente"
        );
      }

      setDataDialog(null);
      clearStates();
      errorNotification(message);
    }
  };

  return (
    <>
      {/* la ventana modal subir archivo, abre otra ventana modal */}
      {visibleNestedDialog && (
        <NestedDialog
          visible={visibleNestedDialog}
          setVisible={setVisibleNestedDialog}
          dataDialog={dataDialog}
        />
      )}

      <Dialog
        header={<Header title={title} subtitle={subtitle} />}
        footer={<Footer onSubmit={onSubmit} onHide={onHide} isDragActive={isDragActive} />}
        visible={visible}
        draggable={false}
        className="max-w-xl"
        onHide={() => onHide()}
      >
        <section className={`${globalTailwindStyle.dialog.container.content}`}>
          {/* zona de arrastrar y soltar archivo */}
          <div
            {...getRootProps()}
            className={clsx({
              "fixed inset-0 w-full h-full flex justify-center items-center bg-dark-blue":
                isDragActive,
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? <DragAndDrop /> : <UploadFile allowedExtensions={allowedExtensions} />}
          </div>

          {acceptedFiles && acceptedFiles?.length > 0 && (
            <div className="flex justify-end mt-2">
              <button onClick={onClickDeleteAllFiles} className="button-with-icon">
                <MdDeleteSweep />
                <span>Eliminar todos los archivos</span>
              </button>
            </div>
          )}

          {!isDragActive
            ? acceptedFiles?.map((acceptedFile: FileWithPath, i: number) => (
                <ListFiles
                  key={i}
                  acceptedFile={acceptedFile}
                  onClickDeleteFile={() => onClickDeleteFile(i)}
                  i={i}
                />
              ))
            : null}
        </section>
      </Dialog>
    </>
  );
}
