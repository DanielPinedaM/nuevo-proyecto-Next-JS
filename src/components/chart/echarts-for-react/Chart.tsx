/*
 *****************************************************
 * Componente para mostrar CUALQUIER tipo de grafica *
 ***************************************************** */

'use client';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { IChartComponentProps } from '@/components/chart/echarts-for-react/models/interfaces/chart.interfaces';
import { useEffect, useState } from 'react';
import SkeletonChart from '@/components/loading/skeleton/skeletonChart';
import { chartTypes } from '@/components/chart/echarts-for-react/models/types/chart.types';
import getChartOptions from '@/components/chart/echarts-for-react/utils/get-chart-options.utils';
import { isLiteralObject, literalObjectLength } from '@/utils/func/dataType.utils';

export default function Chart({
  type = 'bar',
  data,
  options,
  emptyChartData,
}: IChartComponentProps) {
  const [loadingChart, setLoadingChart] = useState<boolean>(true);

  const hasData = () =>
    Boolean(
      (Array.isArray(data?.series) && data?.series?.length > 0) ||
        (isLiteralObject(data?.series) && literalObjectLength(data?.series) > 0)
    );

  useEffect(() => {
    if (hasData()) setLoadingChart(false);
  }, [data]);

  if (!chartTypes?.includes(type)) {
    console.error(
      '❌ error\ntipo de grafico ',
      type,
      'no soportado, los tipos de graficos soportados son ',
      chartTypes,
      '\npara mostrar otro tipo de grafico, agregar mas opciones a getChartOptions'
    );
    return null;
  }

  if (data === undefined || loadingChart) return <SkeletonChart />;

  // la key 'series' es obligatoria para poder mostrar todas las graficas de echarts-for-react
  if (!hasData()) {
    const { message, className } = emptyChartData ?? {};

    return (
      <p className={className ? className : 'text-center'}>{message ? message : 'No hay datos'}</p>
    );
  }

  const chartOption: EChartsOption = getChartOptions({ type, data, options });

  return (
    <div className='relative w-full aspect-square xsm:aspect-[4/3] sm:aspect-[16/10] md:aspect-video xl:aspect-[21/9] 3xl:aspect-[19/9]'>
      <ReactECharts option={chartOption} className='absolute inset-0 block w-full h-full' />
    </div>
  );
}
