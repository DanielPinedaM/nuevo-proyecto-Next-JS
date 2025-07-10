import { IVAuth, secretKeyAuthentication } from '@/types/constant/const-auth';
import { enc, mode, pad, AES } from 'crypto-js';

/**
Encriptar texto */
export const encrypt = async (text: string): Promise<string> => {
  const key = enc.Utf8.parse(secretKeyAuthentication); // número hexadecimal de 16 dígitos como clave
  const iv = enc.Utf8.parse(IVAuth); // Número hexadecimal como desplazamiento de clave

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
Desencriptar texto */
export const decrypt = async (encryptedText: string): Promise<string> => {
  const key = enc.Utf8.parse(secretKeyAuthentication);
  const iv = enc.Utf8.parse(IVAuth);

  // AES.decrypt ahora acepta el texto cifrado completo
  const decrypted = AES.decrypt(encryptedText, key, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });

  return decrypted.toString(enc.Utf8);
};
