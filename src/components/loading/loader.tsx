"use client";
import { RiLoader4Fill } from "react-icons/ri";
import { useLoaderStore } from "@/store/loaderStore";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

export default function Loader() {
  const { isLoading } = useLoaderStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
    }))
  );

  const { hideLoader } = useLoaderStore();

  useEffect(() => {
    if (isLoading) {
      const milliseconds: number = 120000;

      const timeoutId = setTimeout(() => {
        hideLoader();
        console.warn(`⚠️ se oculto el icono de cargando despues de ${milliseconds / 60000} minutos porque una peticion HTTP tardo en responder`);
      }, milliseconds);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, hideLoader]);

  return (
    <>
    {
      isLoading && (
        <div className="bg-opaque-white w-full h-full flex justify-center items-center fixed z-[999999] cursor-wait">
          <RiLoader4Fill className="animate-spin text-blue-500 text-7xl" />
        </div>
      )
    }
    </>
  );
}
