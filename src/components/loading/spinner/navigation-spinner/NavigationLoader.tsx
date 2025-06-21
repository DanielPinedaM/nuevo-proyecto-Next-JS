"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useNavigationLoaderStore } from "@/store/loader/navigationLoaderStore";
import { useShallow } from "zustand/shallow";
import LoaderIcon from "@/components/loading/spinner/LoaderIcon";

/**
Mostrar icono de cargando cuando se da click en enlaces <Link>
y ocultarlo cuando se termine la re-direccion */
export default function NavigationLoader() {
  const { isLoading } = useNavigationLoaderStore(
    useShallow((state) => ({
      isLoading: state.isLoadingNavigation,
    }))
  );

  const { hideLoaderNavigation } = useNavigationLoaderStore();

  const pathname: string = usePathname();
  const searchParams = useSearchParams();

  // oculta el icono de cargando cuando se termina de re-direccionar a la URL
  useEffect(() => {
    hideLoaderNavigation();
   }, [pathname, searchParams])

  return (
    <>
      {isLoading && (
          <LoaderIcon />
      )}
    </>
  );
}
