"use client";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const FaInfoCircle  = dynamic(() => import("react-icons/fa").then((mod) => mod.FaInfoCircle ));

export default function infoNotification(message: string) {
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
