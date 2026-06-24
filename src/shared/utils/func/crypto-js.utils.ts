import { enc, mode, pad, AES } from 'crypto-js';
import { isValidJSONparse } from '@/shared/utils/func/dataType.utils';

const SECRET_KEY_AUTHENTICATION: string = 'GestionAlcaldeCO';
const IV_AUTH: string = 'encryptionIntVec';

/**
encriptar texto */
export const encrypt = async (text: string): Promise<string> => {
  const key = enc.Utf8.parse(SECRET_KEY_AUTHENTICATION); // número hexadecimal de 16 dígitos como clave
  const iv = enc.Utf8.parse(IV_AUTH); // Número hexadecimal como desplazamiento de clave

  const textoHexa = enc.Utf8.parse(text);
  const encrypted = AES.encrypt(textoHexa, key, {
    keySize: 128,
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });

  // Aquí devolvemos todo el objeto cifrado en formato Base64
  return encrypted.toString();
};

/**
desencriptar texto */
export const decrypt = async (encryptedText: string): Promise<string> => {
  const key = enc.Utf8.parse(SECRET_KEY_AUTHENTICATION);
  const iv = enc.Utf8.parse(IV_AUTH);

  // AES.decrypt ahora acepta el texto cifrado completo
  const decrypted = AES.decrypt(encryptedText, key, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });

  return decrypted.toString(enc.Utf8);
};

/**
encriptar JSON */
export const encryptJSON = async (data: Record<string, any>): Promise<string | null> => {
  const text: string = JSON.stringify(data);
  return await encrypt(text);
};

/**
desencriptar JSON */
export const decryptJSON = async (encryptedJSON: string): Promise<any | null> => {
  const decryptedJSON: string | null = await decrypt(encryptedJSON);

  if (isValidJSONparse(decryptedJSON as string)) return JSON.parse(decryptedJSON as string);

  console.error('❌ [decryptJSON] error no es JSON valido ', decryptedJSON);
  return null;
};
