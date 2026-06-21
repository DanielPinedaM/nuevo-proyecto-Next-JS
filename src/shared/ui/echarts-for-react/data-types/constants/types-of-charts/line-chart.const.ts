import { EChartsOption } from 'echarts-for-react';
import {
  ISeries,
  IChartData,
} from '@/shared/ui/echarts-for-react/data-types/interfaces/chart.interfaces';
import { getRandomItem } from '@/shared/utils/func/general.utils';
import DEFAULT_CHART_COLORS from '@/shared/ui/echarts-for-react/data-types/constants/default-chart-colors-const';

/**
opciones de echarts-for-react
para grafico de lineas
https://echarts.apache.org/examples/en/index.html#chart-type-line */
const line = (baseOption: EChartsOption, data: IChartData | undefined) => ({
  ...baseOption,
  xAxis: {
    ...(data?.xAxis ?? {}),
    type: data?.xAxis?.type ?? 'category',
  },

  yAxis: {
    ...(data?.yAxis ?? {}),
    type: data?.yAxis?.type ?? 'value',
  },

  series: (data?.series as ISeries[])?.map((serie: ISeries) => ({
    ...serie,
    type: 'line',
    itemStyle: {
      ...(serie?.itemStyle ?? {}),
      color: serie?.itemStyle?.color ?? getRandomItem(DEFAULT_CHART_COLORS) ?? '',
    },
  })),
});

export default line;
