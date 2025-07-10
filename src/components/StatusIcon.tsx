import { convertToBoolean } from "@/utils/func/dataType";
import dynamic from "next/dynamic";
const IoFaCheckCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaCheckCircle));
const FaTimesCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTimesCircle));
const PrimeReactTooltip = dynamic(() => import("@/components/PrimeReactTooltip"));

/**
dependiendo de un booleano o texto muestra icono de ❌ ó ✅ */
export default function StatusReactIcon({ status }: { status: boolean | string }) {
  if (convertToBoolean(status) === true) {
    return (
      <>
        <PrimeReactTooltip target={"tooltip-true"} content="Si" />
        <IoFaCheckCircle className="tooltip-true text-green-500 w-6 h-6" />
      </>
    );
  }

  if (convertToBoolean(status) === false) {
    return (
      <>
        <PrimeReactTooltip target={"tooltip-false"} content="No" />
        <FaTimesCircle className="tooltip-false text-red-500 w-6 h-6" />
      </>
    );
  }

  return null;
}
