import { defaultGraphColors } from "@/models/constants/colors.constants";
import { EChartsOption } from "echarts-for-react";
import { IChartData, IDataChart, ISeries } from "@/components/chart/echarts-for-react/models/interfaces/chart.interfaces";
import { isNumber } from "@/utils/func/dataType.utils";
import { getRandomItem } from "@/utils/func/general.utils";

/**
opciones de echarts-for-react
para grafico de barras
https://echarts.apache.org/examples/en/index.html#chart-type-bar */
const bar = (baseOption: EChartsOption, data: IChartData | undefined) => ({
  ...baseOption,

  //  area de dibujo del gráfico (márgenes internos)
  ...(data?.grid ? { grid: data?.grid } : {}),

  // eje x <->
  xAxis: {
    ...(data?.xAxis ?? {}),
    type: data?.xAxis?.type ?? "category",

    axisLabel: {
      ...(data?.xAxis?.axisLabel ?? {}),
      color: data?.xAxis?.axisLabel?.color ?? "#00008B",
      fontSize: data?.xAxis?.axisLabel?.fontSize ?? 14,
      fontWeight: data?.xAxis?.axisLabel?.fontWeight ?? "normal",
    },
  },

  // eje y ↕
  yAxis: {
    ...(data?.yAxis ?? {}),
    type: data?.yAxis?.type ?? "value",

    axisLabel: {
      ...(data?.yAxis?.axisLabel ?? {}),
      color: data?.yAxis?.axisLabel?.color ?? "#00008B",
      fontSize: data?.yAxis?.axisLabel?.fontSize ?? 14,
      fontWeight: data?.yAxis?.axisLabel?.fontWeight ?? "normal",
    },
  },

  series:
    (data?.series as ISeries[])?.map((serie: ISeries) => {
      const isNumberArray = Boolean(serie?.data && serie?.data?.[0] && isNumber(serie?.data?.[0]));

      return {
        ...serie,
        type: "bar",
        // es array de numeros number[] - usar un solo color para todas las barras
        ...(isNumberArray || serie?.itemStyle
          ? {
              itemStyle: {
                ...(serie?.itemStyle ?? {}),
                color: serie?.itemStyle?.color ?? getRandomItem(defaultGraphColors) ?? "",
              },
            }
          : {}),

        data:
          serie?.data?.map((item: IDataChart | number) => {
            if (isNumberArray) return item;

            // Es array de objetos IDataChart - usar colores diferentes para cada una de las barras
            const obj = item as IDataChart;
            return {
              ...obj,
              itemStyle: {
                ...(obj?.itemStyle ?? {}),
                color: obj?.itemStyle?.color ?? getRandomItem(defaultGraphColors) ?? "",
              },
            };
          }) ?? [],
      };
    }) ?? [],
});

export default bar;
