"use client";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const FaTimesCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTimesCircle));

export default function errorNotification(message: string) {
  toast.custom(
    <section className="flex justify-center items-center gap-x-2 bg-red-500 text-white p-4 rounded-xl">
      <FaTimesCircle className="opacity-0 scale-50 animate-icon-enter text-2xl" />
      <p>Error: {message}</p>
    </section>,
    {
      duration: 4000,
      position: "top-right",
    }
  );
}
