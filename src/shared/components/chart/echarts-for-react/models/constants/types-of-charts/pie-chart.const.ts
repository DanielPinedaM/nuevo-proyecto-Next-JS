import { EChartsOption } from 'echarts-for-react';
import { getRandomItem } from '@/shared/utils/func/general.utils';
import {
  IChartData,
  IDataChart,
  ISeries,
} from '@/shared/components/chart/echarts-for-react/models/interfaces/chart.interfaces';
import { defaultGraphColors } from '@/shared/data-types/constants/colors.const';

/**
opciones de echarts-for-react
para gráfico de torta
https://echarts.apache.org/examples/en/index.html#chart-type-pie */
const pie = (baseOption: EChartsOption, data: IChartData | undefined) => ({
  ...baseOption,
  series:
    (data?.series as ISeries[])?.map((serie: ISeries) => ({
      ...serie,
      type: 'pie',
      radius: serie?.radius ?? '50%',

      label: {
        ...(serie?.label ?? {}),
        color: serie?.label?.color ?? '#00008B',
        fontSize: serie?.label?.fontSize ?? 14,
        fontWeight: serie?.label?.fontWeight ?? 'normal',
      },

      data:
        (serie?.data as IDataChart[])?.map((item: IDataChart) => ({
          ...item,
          itemStyle: {
            ...(item?.itemStyle ?? {}),
            color: item?.itemStyle?.color ?? getRandomItem(defaultGraphColors) ?? '',
          },
        })) ?? [],
    })) ?? [],
});

export default pie;
