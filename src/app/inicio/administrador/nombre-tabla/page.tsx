import InputTypeTextSearchByURLqueryString from "@/components/InputTypeTextSearchByURLqueryString";
import SkeletonTable from "@/components/loading/skeleton/skeletonTable";
import IParams from "@/types/interface/interface-params";
import { Suspense } from "react";
import ButtonsOpenDialogNombreTabla from "./dialog/buttonsOpenDialogNombreTabla";
import GetTable from "./table/getTable";


export default async function Page({ searchParams }: IParams) {
  const { search } = await searchParams;

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-dark-pink mb-4">Consulta de tablas</h3>

          <div className="flex gap-x-16">
             <ButtonsOpenDialogNombreTabla />
          </div>
        </div>

        <InputTypeTextSearchByURLqueryString label={"Buscar"} placeholder={"Código, nombre..."} />
      </div>

      <Suspense key={search?.toString()} fallback={<SkeletonTable />}>
        <GetTable search={ search } />
      </Suspense>
    </section>
  );
}
