"use client";
import { useNavigationLoaderStore } from "@/store/loader/navigationLoaderStore";
import { usePathname, useRouter } from "next/navigation";

interface ICustomLink {
  onClick?: () => void;
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
esto se usa solamente en el menu,
sirve para re-direccionar entre rutas, igual q etiqueta <Link>,
la diferencia es q muestra icono de cargando hasta q se termine de re-direccionar */
export default function CustomLink({ onClick, href, className, children }: ICustomLink) {
  const { showLoaderNavigation, hideLoaderNavigation } = useNavigationLoaderStore();

  const pathname: string = usePathname();

  const router = useRouter();

  const handleClick = (): void => {
    onClick?.();

    // NO mostrar loader cuando se da click al mismo enlace del menu
    if (pathname === href) {
      hideLoaderNavigation();
      return;
    }

    showLoaderNavigation();
    router.push(href);
  };

  return (
      <button onClick={handleClick} className={className ?? ""}>
        {children}
      </button>
  );
}
