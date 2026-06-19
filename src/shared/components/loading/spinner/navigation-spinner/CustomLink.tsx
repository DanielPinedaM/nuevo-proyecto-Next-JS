"use client";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import { useNavigationLoaderStore } from "@/shared/store/loader/navigationLoaderStore";
import { isString } from "@/shared/utils/func/dataType.utils";
import { usePathname, useRouter } from "next/navigation";
import Button from '@/shared/ui/buttons/Button';

interface ICustomLink {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  keepQueryKeys?: string[];
}

/**
sirve para re-direccionar entre rutas,
igual q etiqueta <Link>,
la diferencia es q:
- muestra icono de cargando hasta q se termine de re-direccionar
- con la prop keepQueryKeys puedo conservar keys especificas del URL query params, por defecto se borra todos los URL query params */
export default function CustomLink({
  onClick,
  href,
  className,
  children,
  keepQueryKeys = [],
}: ICustomLink) {
  const { setQueryParams } = useQueryParams();
  const { showLoaderNavigation, hideLoaderNavigation } = useNavigationLoaderStore();

  const pathname: string = usePathname();
  const router = useRouter();

  const handleClick = (): void => {
    if (onClick) onClick();

    // NO mostrar loader cuando se da click al mismo enlace
    if (pathname === href) {
      hideLoaderNavigation();
      return;
    }

    // NO mostrar loader cuando el enlace esta vacio
    if (!isString(href) || String(href).trim() === "") {
      hideLoaderNavigation();
      return;
    }

    if (!keepQueryKeys || keepQueryKeys?.length === 0) {
      showLoaderNavigation();
      router.push(href);
      return;
    }

    // conservar keys especificas del URL query params
    const currentParams = new URLSearchParams(window.location.search);
    const newParams: Record<string, string> = {};

    keepQueryKeys.forEach((key: string) => {
      const value = currentParams.get(key);
      if (value !== null) newParams[key] = value;
    });

    setQueryParams(newParams, {
      replaceAll: true,
      showLoader: true,
      customPathname: href,
    });
  };

  return (
    <span className={className}>
      <Button variant="link" onClick={handleClick}>
        {children}
      </Button>
    </span>
  );
}
