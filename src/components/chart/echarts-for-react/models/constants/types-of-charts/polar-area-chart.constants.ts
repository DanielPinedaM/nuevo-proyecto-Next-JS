import { IAngleAxis, IChartData, IRadiusAxis, ISeries } from "@/components/chart/echarts-for-react/models/interfaces/chart.interfaces";
import { EChartsOption } from "echarts-for-react";
import { defaultGraphColors } from "@/models/constants/colors.constants";
import { getRandomItem } from "@/utils/func/general.utils";
import { isLiteralObject } from "@/utils/func/dataType.utils";

/**
opciones de echarts-for-react
para grafico de area polar
https://echarts.apache.org/examples/en/editor.html?c=bar-polar-label-radial
https://echarts.apache.org/examples/en/editor.html?c=polar-endAngle */
const polarArea = (baseOption: EChartsOption, data: IChartData | undefined) => ({
  ...baseOption,

  polar:
    // polar es array de objetos [ {} ]
    Array.isArray(data?.polar)
      ? data.polar.map((p) => ({
          ...p,
          radius: (p as any)?.radius ?? [30, "80%"],
        }))
      : // polar es objeto literal {}
        {
          ...(data?.polar ?? {}),
          radius: data?.polar?.radius ?? [30, "80%"],
        },

  radiusAxis:
    // radiusAxis es array de objetos [ {} ]
    Array.isArray(data?.radiusAxis)
      ? data?.radiusAxis?.map((axis: IRadiusAxis) => ({
          ...axis,
        }))
      : // radiusAxis es objeto literal {}
        {
          ...(data?.radiusAxis ?? {}),
          max: data?.radiusAxis?.max ?? 4,
        },

  angleAxis:
    // angleAxis es array de objetos [ {} ]
    Array.isArray(data?.angleAxis)
      ? data?.angleAxis?.map((axis: IAngleAxis) => ({
          ...axis,
          type: axis?.type ?? "category",
          startAngle: axis?.startAngle ?? 75,
        }))
      : // angleAxis es objeto literal {}
        {
          ...(data?.angleAxis ?? {}),
          type: data?.angleAxis?.type ?? "category",
          startAngle: data?.angleAxis?.startAngle ?? 75,
        },

  series:
    // series es array de objetos [ {} ]
    Array.isArray(data?.series)
      ? data?.series?.map((serie: ISeries) => ({
          ...serie,
          type: "bar",
          coordinateSystem: "polar",
          itemStyle: {
            ...(serie?.itemStyle ?? {}),
            color: serie?.itemStyle?.color ?? getRandomItem(defaultGraphColors) ?? "",
          },
        }))
      : isLiteralObject(data?.series)
      ? // series es objeto literal {}
        {
          ...(data?.series as ISeries),
          type: "bar",
          coordinateSystem: "polar",
          itemStyle: {
            ...(data?.series?.itemStyle ?? {}),
            color: data?.series?.itemStyle?.color ?? getRandomItem(defaultGraphColors) ?? "",
          },
        }
      : [],
});

export default polarArea;
