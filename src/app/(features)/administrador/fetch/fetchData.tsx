import ListData from '@/app/(features)/administrador/fetch/listData';
import { GET } from '@/shared/api/http-client/http-gateway.api';
import { IRequestOptions } from '@/shared/api/http-client/types/request-data.types';

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
      {posts?.map((post: any, i: number) => (
        <ListData post={post} key={post.id ?? i} />
      ))}
    </>
  );
}
