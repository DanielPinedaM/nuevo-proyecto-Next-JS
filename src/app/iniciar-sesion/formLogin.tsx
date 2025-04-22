/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import errorNotification from '@/components/dialog/notification/errorNotification';
import GeneralErrorMessage from '@/components/GeneralErrorMessage';
import { login } from '@/services/auth/auth';
import { cookieOptionsInLogin } from '@/types/constant/const-cookie-storage';
import { globalTailwindStyle } from '@/types/constant/const-layout';
import { constRegex } from '@/types/constant/const-regex';
import IFormLogin from '@/types/interface/interface-login';
import { IResponse } from '@/types/interface/interface-response';
import { encrypt } from '@/utils/func/cryptoService';
import { sessionStorageDeleteAll } from '@/utils/func/sessionStorage';
import { deleteCookie, getCookies, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function FormLogin() {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormLogin>({
    criteriaMode: 'all',
  });

  const router = useRouter();

  useEffect(() => {
    deleteStorageAndCookies();
  }, []);

  const deleteStorageAndCookies = (): void => {
    deleteAllCookies();
    sessionStorageDeleteAll();
  };

  const deleteAllCookies = (): void => {
    const cookies = getCookies();

    if (cookies) {
      Object.keys(cookies).forEach((cookieName: string) => {
        deleteCookie(cookieName);
      });
    }
  };

  const iterateUserData = (data: any): void => {
    const errorMessage: string =
      '❌ error, NO se puede setear las cookies porque la api NO ha respondido con los datos q se guardan en las cookies ';

    if (!data || Object?.keys(data)?.length === 0) {
      console.error(errorMessage, '\n', data);
      return;
    }

    // el tiempo de expiracion de las cookies en front y el token en back son los mismos
    const maxAge: number = data?.expiresIn;

    if (!maxAge) {
      console.error(errorMessage, '\n', maxAge);
      return;
    }

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (!key || !value) {
        console.error(errorMessage, '\n', key, value);
        return;
      }

      setCookie(key, value, cookieOptionsInLogin({ maxAge }));
    });
  };

  const onSubmit = async (formData: IFormLogin): Promise<void> => {
    //des-comentar lo q esta comentado a continuacion para hacer peticion http de iniciar sesion

    /* const { user, password } = formData;

    const body: IFormLogin = {
      user: user.trim(),
      password: await encrypt(password!.trim()),
    }

    const { success, message, data }: IResponse = await login(body);

    if (success) { */
    // este codigo se tiene q borrar porq queme los datos
    iterateUserData({
      expiresIn: 7200,
      accessToken: 'aqui va el token',
    });

    /* este es el codigo correcto q se tiene q des-comentar
    iterateUserData(data); */

    router.push('/inicio/administrador');
    //} else {
    //deleteStorageAndCookies();
    //errorNotification(message);
    //}
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className='mb-2'>
          <label>
            <span className='cursor-pointer'>Correo electrónico</span>
            <Controller
              name='user'
              control={control}
              rules={{
                required: 'Digite correo electrónico',
                pattern: {
                  value: constRegex.text.email,
                  message: 'Correo electrónico invalido',
                },
                minLength: {
                  value: 2,
                  message: 'Mínimo 2 caracteres',
                },
                maxLength: {
                  value: 30,
                  message: 'Máximo 30 caracteres',
                },
              }}
              render={({ field, field: { name, value = '', onChange, onBlur } }) => (
                <InputText
                  {...field}
                  id={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  placeholder='nombre@correo.com'
                  className={`${globalTailwindStyle.input.general} block w-full`}
                />
              )}
            />
          </label>
          <GeneralErrorMessage errors={errors} name='user' />
        </div>

        <div className='mb-2'>
          <label>
            <span className='cursor-pointer'>Contraseña</span>
            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Digite contraseña',
              }}
              render={({ field, field: { name, value = '', onChange, onBlur } }) => (
                <Password
                  {...field}
                  id={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  variant='filled'
                  feedback={false}
                  placeholder='Contraseña'
                  className={`${globalTailwindStyle.input.general}`}
                />
              )}
            />
          </label>
          <GeneralErrorMessage errors={errors} name='password' />
        </div>

        <div className='flex justify-end'>
          <button type='submit' className={`${globalTailwindStyle.button} uppercase`}>
            ingresar
          </button>
        </div>
      </form>
  );
}
