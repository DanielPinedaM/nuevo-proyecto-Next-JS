"use client";
import { useLoaderStore } from "@/store/loaderStore";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import LoaderIcon from "./LoaderIcon";

export default function LoaderInApiRequest() {
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
        <LoaderIcon/>
      )
    }
    </>
  );
}
