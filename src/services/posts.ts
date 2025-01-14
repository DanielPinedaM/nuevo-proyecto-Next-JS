import { IResponse } from '@/types/interface/interface-response';
import { httpRequest } from './generalServiceHttp';

export async function loadPost() {
  const response/* : IResponse */ = await httpRequest(
    'GET',
    process.env.NEXT_PUBLIC_JSON_PLACE_HOLDER
  );

  return response;
}
