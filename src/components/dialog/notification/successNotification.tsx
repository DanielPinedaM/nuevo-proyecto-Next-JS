"use client";
import { isString } from "@/utils/func/dataType.utils";
import { isUseClient } from "@/utils/func/general.utils";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const FaCheckCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaCheckCircle));

export default function successNotification(message: string): void {
  if (!isUseClient()) {
    console.error(
      "❌ error - successNotification - react-hot-toast se tiene q usar en componente cliente 'use client'"
    );
    return;
  }

  if (!isString(message)) {
    console.error(
      "❌ error - successNotification - react-hot-toast necesita el mensaje tipo string"
    );
    return;
  }

  if (String(message).trim() === "") {
    console.error(
      "❌ error - successNotification - react-hot-toast - el mensaje no puede ser un string vacio ''"
    );
    return;
  }

  toast.custom(
    <section className="flex justify-center items-center gap-x-2 bg-green-500 p-4 rounded-xl">
      <FaCheckCircle className="text-white animate-icon-enter text-2xl" />
      <p>
        <span className="text-white">Exito: </span>
        <span className="text-white">
          {message.replaceAll("undefined", "").replaceAll("null", "").replaceAll("NaN", "")}
        </span>
      </p>
    </section>,
    {
      duration: 4000,
      position: "top-right",
    }
  );
}
