import ListData from "@/app/inicio/administrador/fetch/listData";
import DataRender from "@/shared/components/DataRender";
import { GET } from "@/shared/services/general-service/http.service";
import { IRequestOptions } from "@/shared/services/general-service/types/request-data.types";

export default async function FetchData() {
  /* hacer peticion de la data del lado del servidor con SSR */
  const optionsApi: IRequestOptions = {
    validateResponse: false,
  };

  const { success, data } = await GET(
    `${process.env.NEXT_PUBLIC_JSON_PLACE_HOLDER}/todos`,
    optionsApi
  );

  let posts = [];
  if (success) {
    posts = data;
  } else {
    posts = [];
  }

  /* ListData es un componente del lado del cliente 
  que recibe los datos y los renderiza del lado del cliente */
  return (
    <>
      <DataRender
        data={posts}
        RenderComponent={
          <>
            {posts.map((post: any, i: number) => (
              <ListData post={post} key={post.id ?? i} />
            ))}
          </>
        }
        EmptyComponent={<p className="text-center">No hay datos</p>}
      />
    </>
  );
}
