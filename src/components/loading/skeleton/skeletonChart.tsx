import { getRandomItem } from "@/utils/func/general.util";
import clsx from "clsx";
import { FaChartBar, FaChartLine, FaChartPie, FaChartArea } from "react-icons/fa";
import { FaChartGantt } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const chartIcons = [FaChartBar, FaChartLine, FaChartPie, FaChartArea, FaChartGantt];

interface ISkeletonChart {
  height?: string;
}

export default function SkeletonChart({ height }: ISkeletonChart) {
  const RandomIcon = getRandomItem(chartIcons);

  return (
    <>
      {RandomIcon && (
        <div
          className={twMerge(
              clsx(height ?? "h-full"),
            "flex justify-center items-center cursor-wait rounded-2xl border-2 border-white/40 p-4 bg-gray-500/20"
          )}
        >
          <RandomIcon className="text-blue-400/50 animate-pulse h-[80%] w-auto block" />
        </div>
      )}
    </>
  );
}
