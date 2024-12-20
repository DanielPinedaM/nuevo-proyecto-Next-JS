
import { httpRequest } from '@/api/generalServiceHttp';
import ListData from './listData';

async function loadPost() {
  try {
    /* llamar a funcion general httpRequest() para hacer peticiones http */
    console.log("env", process.env.NEXT_PUBLIC_JSON_PLACE_HOLDER)
    const response = await httpRequest('GET', 'https://jsonplaceholder.typicode.com/todos');
    return response;
  } catch {
    return [];
  }
}

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
