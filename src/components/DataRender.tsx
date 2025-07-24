/* eslint-disable @typescript-eslint/no-explicit-any */
import { isBoolean, isLiteralObject, literalObjectLength } from "@/utils/func/dataType.utils";
import { ReactNode } from "react";

interface IDataRender {
  data: any[] | undefined;
  SkeletonComponent?: ReactNode;
  RenderComponent: ReactNode;
  loading?: boolean | null;
  empty?: {
    message?: string;
    className?: string;
  }
}

/**
Muestra: skeleton, data del componente ó "no hay datos" */
export default function DataRender({
  data,
  SkeletonComponent,
  RenderComponent,
  loading = null,
  empty,
}: IDataRender) {

  if (SkeletonComponent) {
    if (data === undefined || (isBoolean(loading) && loading))  return <>{SkeletonComponent}</>
  }

  if (Array.isArray(data) && data?.length > 0) return <>{RenderComponent}</>;

  if (isLiteralObject(data) && literalObjectLength(data) > 0) return <>{RenderComponent}</>;

  const {message, className} = empty ?? {}
  if (message) {
    return className
      ? <p className={className}>{message}</p>
      : <p>{message}</p>;
  }

  return null;
}
