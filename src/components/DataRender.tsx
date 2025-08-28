
import { isLiteralObject, literalObjectLength } from "@/utils/func/dataType.utils";
import { ReactNode } from "react";

interface IDataRender {
  data: any[] | undefined;
  SkeletonComponent?: ReactNode;
  RenderComponent: ReactNode;
  loading?: boolean | null;
  EmptyComponent?: ReactNode;
}

/**
Muestra: skeleton, data del componente ó "no hay datos" */
export default function DataRender({
  data,
  SkeletonComponent,
  RenderComponent,
  loading = null,
  EmptyComponent,
}: IDataRender) {

  if (SkeletonComponent) {
    if (data === undefined ||  (typeof loading === "boolean" && loading))  return <>{SkeletonComponent}</>
  }

  if (Array.isArray(data) && data?.length > 0) return <>{RenderComponent}</>;

  if (isLiteralObject(data) && literalObjectLength(data) > 0) return <>{RenderComponent}</>;

  if (EmptyComponent) return <>{EmptyComponent}</>

  return null;
}
