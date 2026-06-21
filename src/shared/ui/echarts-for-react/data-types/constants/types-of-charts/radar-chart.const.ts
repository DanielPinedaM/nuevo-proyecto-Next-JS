import {
  IChartData,
  IDataChart,
  ISeries,
} from "@/shared/ui/echarts-for-react/data-types/interfaces/chart.interfaces";
import DEFAULT_CHART_COLORS from "@/shared/ui/echarts-for-react/data-types/constants/default-chart-colors-const";
import { getRandomItem } from "@/shared/utils/func/general.utils";
import { EChartsOption } from "echarts-for-react";

/**
opciones de echarts-for-react
para gráfico de radar
https://echarts.apache.org/examples/en/index.html#chart-type-radar */
const radar = (baseOption: EChartsOption, data: IChartData | undefined) => ({
  ...baseOption,
  radar: {
    ...(data?.radar ?? {}),
  },

  series:
    (data?.series as ISeries[])?.map((serie: ISeries) => ({
      ...serie,
      type: "radar",
      data:
        (serie?.data as IDataChart[])?.map((item: IDataChart) => ({
          ...item,
          itemStyle: {
            ...(item?.itemStyle ?? {}),
            color: serie?.itemStyle?.color ?? getRandomItem(DEFAULT_CHART_COLORS) ?? "",
          },
        })) ?? [],
    })) ?? [],
});

export default radar;
