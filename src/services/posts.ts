import { httpRequest } from './generalService/httpRequest';

export async function loadPost() {
  const response = await httpRequest(
    'GET',
    `${process.env.NEXT_PUBLIC_JSON_PLACE_HOLDER}/todos`,
    {
      validateResponse: false,
    }
  );

  return response;
}
