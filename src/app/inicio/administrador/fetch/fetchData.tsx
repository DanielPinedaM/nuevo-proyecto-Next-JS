import { loadPost } from '@/services/posts';
import ListData from './listData';

export default async function FetchData() {
  /* hacer peticion de la data del lado del servidor con SSR */
  const posts = await loadPost();

  return (
    <>
      {posts.map((post) => (
       /* ListData es un componente del lado del cliente 
       que recibe los datos y los renderiza del lado del cliente */
        <ListData post={post} key={post.id} />
      ))}
    </>
  );
}
