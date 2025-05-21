"use client";
import { isUseClient } from "@/utils/func/general";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const FaInfoCircle  = dynamic(() => import("react-icons/fa").then((mod) => mod.FaInfoCircle ));

export default function infoNotification(message: string): void {
  if (!isUseClient()) {
    console.error("❌ error, react-hot-toast se tiene q usar en componente cliente 'use client'")
    return;
  }

  toast.custom(
    <section className="flex justify-center items-center gap-x-2 bg-light-blue text-white p-4 rounded-xl">
      <FaInfoCircle  className="opacity-0 scale-50 animate-icon-enter text-2xl" />
      <p>Aviso: {message}</p>
    </section>,
    {
      duration: 4000,
      position: "top-right",
    }
  );
}
