/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import HeaderDialog from "@/components/dialog/HeaderDialog";
import successNotification from "@/components/dialog/notification/successNotification";
import DragAndDrop from "@/components/dialog/uploadFile/textAndButtons/dragAndDrop";
import Footer from "@/components/dialog/uploadFile/textAndButtons/footer";
import ListFiles from "@/components/dialog/uploadFile/textAndButtons/listFiles";
import UploadFile from "@/components/dialog/uploadFile/textAndButtons/uploadFile";
import { IResponse } from "@/services/generalService/types/requestDataTypes";
import {
  uploadOneOrMoreFilesByBody,
  uploadOneOrMoreFilesByParams,
  uploadOneOrMoreFilesWithoutId,
} from "@/services/uploadFile";
import { globalTailwindStyle } from "@/types/constant/const-layout";
import { IUploadFile } from "@/types/interface/interface-upload-file";
import { validateId, validateSingleFile } from "@/utils/func/file/fileValidations";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import errorNotification from "../notification/errorNotification";

/**
componente con ventana modal para subir UN SOLO archivo */
export default function UploadSingleFile({
  sendId,
  url,
  allowedExtensions,
  NestedDialog = undefined,
  title,
  subtitle,
  visible,
  setVisible,
}: IUploadFile) {
  const router = useRouter();

  const [visibleNestedDialog, setVisibleNestedDialog] = useState<boolean>(false);
  const [dataDialog, setDataDialog] = useState<any | null>();

  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);
  const [previousFileName, setPreviousFileName] = useState<string>("");

  const onDrop = useCallback(
    (files: FileWithPath[]) => {
      const hasError: boolean = validateSingleFile({
        files,
        previousFileName,
        allowedExtensions,
      });
      if (hasError) return;

      // guardar UN SOLO archivo
      setAcceptedFiles([files[0]]);
      setPreviousFileName(files[0]?.name);
    },
    [previousFileName]
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
    setPreviousFileName("");
  };

  const onClickDeleteFile = (): void => {
    clearStates();
    successNotification(`Archivo ${acceptedFiles[0]?.name} eliminado`);
  };

  const onHide = (): void => {
    setDataDialog(null);
    clearStates();
    setVisible?.(false);
  };

  const onSubmit = async (): Promise<void> => {
    if (validateId(sendId)) return;

    const hasError: boolean = validateSingleFile({ files: acceptedFiles });
    if (hasError) return;

    // formData contiene el archivo y es el body de la peticion http
    const formData = new FormData();

    // agregar archivo
    formData.append("file", acceptedFiles[0], acceptedFiles[0]?.name);

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
      successNotification(`Archivo ${acceptedFiles[0]?.name} subido`);

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
          "solución al error:  \n 1) Puede q la URL sea invalida \n 2) Estas enviando mal los props al componente"
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
      {NestedDialog && visibleNestedDialog && (
        <NestedDialog
          visible={visibleNestedDialog}
          setVisible={setVisibleNestedDialog}
          dataDialog={dataDialog}
        />
      )}

      <Dialog
        header={<HeaderDialog title={title} subtitle={subtitle} />}
        footer={<Footer onSubmit={onSubmit} onHide={onHide} isDragActive={isDragActive} />}
        visible={visible}
        draggable={false}
        className={`${globalTailwindStyle.dialog.container.contour} max-w-xl`}
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

          {!isDragActive
            ? acceptedFiles?.map((acceptedFile, i: number) =>
                i === 0 ? (
                  <ListFiles
                    key={i}
                    acceptedFile={acceptedFile}
                    onClickDeleteFile={() => onClickDeleteFile()}
                    i={0}
                  />
                ) : null
              )
            : null}
        </section>
      </Dialog>
    </>
  );
}
