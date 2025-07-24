import { EChartsOption } from 'echarts-for-react';
import { IChartOptions } from '@/components/chart/echarts-for-react/models/interfaces/chart.interfaces';

/**
objeto literal {} con los estilos por defecto de todas las graficas

todas las graficas contienen este objeto literal {} */
const baseOptionConst = (options?: IChartOptions): EChartsOption => ({
  title: {
    left: options?.title?.left ?? 'left',

    // texto del titulo
    ...(options?.title?.text ? { text: options.title.text } : {}),
    // estilos de titulo
    ...(options?.title?.text
      ? {
          textStyle: {
            color: options?.title?.textStyle?.color ?? '#fff',
            fontWeight: options?.title?.textStyle?.fontWeight ?? 'bold',
            fontSize: options?.title?.textStyle?.fontSize ?? 16,
          },
        }
      : {}),

    // texto del sub-titulo
    ...(options?.title?.subtext ? { subtext: options.title.subtext } : {}),
    // estilos de sub-titulo
    ...(options?.title?.subtext
      ? {
          subtextStyle: {
            color: options?.title?.subtextStyle?.color ?? '#fff',
            fontWeight: options?.title?.subtextStyle?.fontWeight ?? 'bolder',
            fontSize: options?.title?.subtextStyle?.fontSize ?? 14,
          },
        }
      : {}),
  },

  // mensaje emergente (tooltip) al pasar mouse (hover) sobre las barras de la grafica
  tooltip: {
    show: true,
    trigger: 'item',
  },

  // leyenda de grafica: A la izquierda tiene un cuadro con color y a la derecha tiene el signifcado del color
  legend: {
    ...(options?.legend ?? {}),
    orient: options?.legend?.orient ?? 'horizontal',
    left: options?.legend?.left ?? 'center',
    top: options?.legend?.top ?? 'bottom',
    textStyle: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
});

export default baseOptionConst;
