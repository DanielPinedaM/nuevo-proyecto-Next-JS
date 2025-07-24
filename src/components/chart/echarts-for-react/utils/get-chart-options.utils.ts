import { IGetChartOptionsProps } from '@/components/chart/echarts-for-react/models/interfaces/chart.interfaces';
import { EChartsOption } from 'echarts-for-react';
import { ChartType } from '@/components/chart/echarts-for-react/models/types/chart.types';

import bar from '@/components/chart/echarts-for-react/models/constants/types-of-charts/bar-chart.constants';
import line from '@/components/chart/echarts-for-react/models/constants/types-of-charts/line-chart.constants';
import pie from '@/components/chart/echarts-for-react/models/constants/types-of-charts/pie-chart.constants';
import radar from '@/components/chart/echarts-for-react/models/constants/types-of-charts/radar-chart.constants';
import polarArea from '@/components/chart/echarts-for-react/models/constants/types-of-charts/polar-area-chart.constants';
import baseOptionConst from '@/components/chart/echarts-for-react/models/constants/base-option-chart.constants';

/**
iterar la data dependiendo del tipo de grafica,
aqui se puede agregar nuevos tipos de grafica */
export default function getChartOptions({
  type,
  data,
  options,
}: IGetChartOptionsProps): EChartsOption {
  const baseOption: EChartsOption = baseOptionConst(options);

  const builders: Record<ChartType, () => EChartsOption> = {
    // grafico de barras
    bar: () => bar(baseOption, data),

    // grafico de lineas
    line: () => line(baseOption, data),

    // gráfico de torta
    pie: () => pie(baseOption, data),

    // gráfico de radar
    radar: () => radar(baseOption, data),

    // grafico de area polar
    polarArea: () => polarArea(baseOption, data),
  };

  return builders[type ?? 'bar']();
}
