import { RiLoader4Fill } from "react-icons/ri";

export default function LoaderIcon() {
    return (
        <div className="bg-white/50 w-full h-full flex justify-center items-center fixed z-[999999] cursor-wait">
          <RiLoader4Fill className="animate-spin text-blue-500 text-7xl" />
        </div>
    )
}