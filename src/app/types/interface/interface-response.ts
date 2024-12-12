/* eslint-disable @typescript-eslint/no-explicit-any */

interface IData {
  timestamp: string;
  path: string;
  error: string | null;
}

/* tipo de dato de como responde la API a la q se conecta el frontend */
export interface IResponse {
  success: boolean;
  status: number;
  message: string | any[];
  data: IData | any;
}
