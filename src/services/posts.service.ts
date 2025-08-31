import { GET } from "./general-service/http.service";

export async function loadPost() {
  const response = await GET(`${process.env.NEXT_PUBLIC_JSON_PLACE_HOLDER}/todos`, {
    validateResponse: false,
  });

  return response;
}
