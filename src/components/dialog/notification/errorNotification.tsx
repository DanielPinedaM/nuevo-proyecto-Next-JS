"use client";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const FaTimesCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTimesCircle));
import { isUseClient } from "@/utils/func/general.utils";
import { isString } from "@/utils/func/dataType.utils";
import { IOptionsReactHotToast } from "@/models/interfaces/general.interfaces";

export default function errorNotification(message: string, options?: IOptionsReactHotToast): void {
  if (!isUseClient()) return;

  if (!isString(message)) {
    console.error("❌ error - errorNotification - react-hot-toast necesita el mensaje tipo string");
    return;
  }

  if (String(message).trim() === "") {
    console.error(
      "❌ error - errorNotification - react-hot-toast - el mensaje no puede ser un string vacio ''"
    );
    return;
  }

  const { duration = 3000, position = "top-right" } = options ?? {};

  toast.custom(
    <section className="flex justify-center items-center gap-x-2 bg-red-500 p-4 rounded-xl">
      <FaTimesCircle className="text-white animate-icon-enter text-2xl" />
      <p>
        <span className="text-white">Error: </span>
        <span className="text-white">
          {message.replaceAll("undefined", "").replaceAll("null", "").replaceAll("NaN", "")}
        </span>
      </p>
    </section>,
    {
      duration,
      position,
    }
  );
}
