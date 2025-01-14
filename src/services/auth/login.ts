
import IFormLogin from "@/types/interface/interface-login";
import { IResponse } from "@/types/interface/interface-response";

// peticion para loguearse
export async function login(body: IFormLogin): Promise<IResponse> {
  const response: IResponse = await httpRequest('POST', process.env.NEXT_PUBLIC_ENVIRONMENT, {
    body,
  });

  return response;
}
