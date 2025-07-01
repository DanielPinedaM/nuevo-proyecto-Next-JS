"use client";
import { Chart } from "primereact/chart";

export interface IChartData {
  labels: string[];
  datasets: IChartDatasets[];
}

interface IChartDatasets {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
}

interface IChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
    };
  };
}

export const chartTypes: string[] = ["bar", "line", "polarArea", "radar", "pie"];

interface IChartComponentProps {
  type?: "bar" | "line" | "polarArea" | "radar" | "pie";
  className?: string;
  data: IChartData;
  options?: IChartOptions;
  title: string;
}

// de forma dinamica, muestra grafica de Prime React
export default function ChartComponent({
  type = "bar",
  className = "w-full md:w-15rem",
  data,
  options,
  title = ""
}: IChartComponentProps) {
  return (
    <>
      {data ? (
        <div className="text-center">
          {
            title && (
              <>
                <h1>{title}</h1>
                <br />
              </>
            )
          }
          <Chart type={type} data={data} options={options} className={className} />
        </div>
      ) : (
        <p className="text-red-500 text-center font-bold">
          ⚠️ No se pudo cargar el gráfico
        </p>
      )}
    </>
  );
}
