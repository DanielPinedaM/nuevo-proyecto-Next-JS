"use client";
import { globalTailwindStyle } from "@/types/constant/const-layout";
import { IQuestionNotification } from "@/types/interface/interface-prime-react";
import dynamic from "next/dynamic";
import { Dialog } from "primereact/dialog";
const FaQuestionCircle = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaQuestionCircle)
);

export default function QuestionNotification({
  visible,
  setVisible,
  message,
  onClickAccept,
  onClickCancel,
}: IQuestionNotification) {
  const Header = () => (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <FaQuestionCircle className="text-5xl text-zinc-600" />
      <h1 className="text-center">Confirmación</h1>
    </div>
  );

  const onHide = (): void => setVisible?.(false);

  const Footer = () => (
    <div className="flex justify-center gap-x-2">
      <button
        onClick={() => {
          onClickAccept?.();
          onHide?.();
        }}
        className={`${globalTailwindStyle.button.darkBlue}`}
      >
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

  return (
    <Dialog
      header={Header}
      footer={Footer}
      visible={visible}
      draggable={false}
      className={`${globalTailwindStyle.dialog.container.contour} max-w-md`}
      onHide={() => onHide?.()}
    >
      <section className={`${globalTailwindStyle.dialog.container.content}`}>
        <p className="text-center">¿{message}?</p>
      </section>
    </Dialog>
  );
}
