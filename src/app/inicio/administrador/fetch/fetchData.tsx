import { loadPost } from '@/services/posts';
import ListData from './listData';

export default async function FetchData() {
  /* hacer peticion de la data del lado del servidor con SSR */
  const posts = await loadPost();

  /* ListData es un componente del lado del cliente 
  que recibe los datos y los renderiza del lado del cliente */
  return (
    <>
      {posts && posts?.length > 0 ? (
        <>
          {posts.map((post) => (
            <ListData post={post} key={post.id} />
          ))}
        </>
      ) : (
        <p>No hay datos</p>
      )}
    </>
  );
}
