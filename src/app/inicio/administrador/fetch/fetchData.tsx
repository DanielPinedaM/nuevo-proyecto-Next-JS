import { loadPost } from '@/services/posts.service';
import ListData from './listData';
import DataRender from '@/components/DataRender';

export default async function FetchData() {
  /* hacer peticion de la data del lado del servidor con SSR */
  const posts = await loadPost();

  /* ListData es un componente del lado del cliente 
  que recibe los datos y los renderiza del lado del cliente */
  return (
    <>
      <DataRender
        data={posts}
        RenderComponent={
          <>
            {posts.map((post) => (
              <ListData post={post} key={post.id} />
            ))}
          </>
        }
        empty={{
          message: 'No hay datos',
          className: 'text-center',
        }}
      />
    </>
  );
}
