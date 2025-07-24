import {
  IChartData,
  IDataChart,
  ISeries,
} from '@/components/chart/echarts-for-react/models/interfaces/chart.interfaces';
import { defaultGraphColors } from '@/models/constants/colors.constants';
import { getRandomItem } from '@/utils/func/general.utils';
import { EChartsOption } from 'echarts-for-react';

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
      type: 'radar',
      data:
        (serie?.data as IDataChart[])?.map((item: IDataChart) => ({
          ...item,
          itemStyle: {
            ...(item?.itemStyle ?? {}),
            color: serie?.itemStyle?.color ?? getRandomItem(defaultGraphColors) ?? '',
          },
        })) ?? [],
    })) ?? [],
});

export default radar;
