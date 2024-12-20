import IFormLogin from '@/types/interface/interface-login';
import { IResponse } from '@/types/interface/interface-response';
import { httpRequest } from '../generalServiceHttp';

// peticion para loguearse
export async function login(body: IFormLogin) {
  try {
    const { success, message }: IResponse = await httpRequest(
      'POST',
      process.env.NEXT_PUBLIC_ENVIRONMENT,
      {
        body,
      }
    );

    if (success) {
      console.log(message);
    } else {
      console.error('❌ error \n', message);
    }
  } catch (error) {
    console.error('❌ error \n', error);
  }
}