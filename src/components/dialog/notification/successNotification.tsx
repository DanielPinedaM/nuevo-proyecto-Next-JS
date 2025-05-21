"use client";
import { isUseClient } from "@/utils/func/general";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const FaCheckCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaCheckCircle));

export default function successNotification(message: string): void {
  if (!isUseClient()) {
    console.error("❌ error, react-hot-toast se tiene q usar en componente cliente 'use client'")
    return;
  }

  toast.custom(
    <section className="flex justify-center items-center gap-x-2 bg-green-500 text-white p-4 rounded-xl">
      <FaCheckCircle className="opacity-0 scale-50 animate-icon-enter text-2xl" />
      <p>Exito: {message}</p>
    </section>,
    {
      duration: 4000,
      position: "top-right",
    }
  );
}
