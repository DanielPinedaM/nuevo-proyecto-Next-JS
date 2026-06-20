import { IGetChartOptionsProps } from '@/shared/ui/echarts-for-react/data-types/interfaces/chart.interfaces';
import { EChartsOption } from 'echarts-for-react';
import { ChartType } from '@/shared/ui/echarts-for-react/data-types/types/chart.types';
import bar from '@/shared/ui/echarts-for-react/data-types/constants/types-of-charts/bar-chart.const';
import line from '@/shared/ui/echarts-for-react/data-types/constants/types-of-charts/line-chart.const';
import pie from '@/shared/ui/echarts-for-react/data-types/constants/types-of-charts/pie-chart.const';
import radar from '@/shared/ui/echarts-for-react/data-types/constants/types-of-charts/radar-chart.const';
import polarArea from '@/shared/ui/echarts-for-react/data-types/constants/types-of-charts/polar-area-chart.const';
import baseOptionConst from '@/shared/ui/echarts-for-react/data-types/constants/base-option-chart.const';

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
