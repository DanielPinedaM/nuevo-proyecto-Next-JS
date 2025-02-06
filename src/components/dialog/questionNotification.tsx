"use client";
import { globalTailwindStyle } from "@/types/constant/const-layout";
import { IQuestionNotification } from "@/types/interface/interface-prime-react";
import dynamic from "next/dynamic";
import { Dialog } from "primereact/dialog";
const FaQuestionCircle = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaQuestionCircle)
);

export default function QuestionNotification({
  message,
  onClickAccept,
  onClickCancel,
  visible,
  onHide,
}: IQuestionNotification) {
  const handleAccept = (): void => {
    if (onClickAccept) {
      onClickAccept();
    }
    onHide?.();
  };

  const Header = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-y-2">
        <FaQuestionCircle className="text-5xl text-zinc-600" />
        <h1 className="text-center">Confirmación</h1>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="flex justify-center gap-x-2">
        <button onClick={handleAccept} className={`${globalTailwindStyle.button.darkBlue}`}>
          Sí
        </button>

        <button
          onClick={() => {
            onClickCancel?.();
            onHide?.();
          }}
          className={`${globalTailwindStyle.button.lightBlue}`}
        >
          No
        </button>
      </div>
    );
  };

  return (
    <Dialog
      header={Header}
      footer={Footer}
      visible={visible}
      draggable={false}
      className={`${globalTailwindStyle.dialog.container.contour} max-w-md`}
      onHide={() =>  onHide?.()}
    >
      <section className={`${globalTailwindStyle.dialog.container.content}`}>
        <p className="text-center">¿{message}?</p>
      </section>
    </Dialog>
  );
}
