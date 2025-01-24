'use client';
import { login } from '@/api/login/login';
import GeneralErrorMessage from '@/components/GeneralErrorMessage';
import { globalTailwindStyle } from '@/types/constant/const-layout';
import { constPath } from '@/types/constant/const-path';
import { constRegex } from '@/types/constant/const-regex';
import IFormLogin from '@/types/interface/interface-login';
import { IResponse } from '@/types/interface/interface-response';
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
    console.log("env")
    console.log("NEXT_PUBLIC_PRUEBA_UNO", process.env.NEXT_PUBLIC_PRUEBA_UNO);
    console.log("NEXT_PUBLIC_PRUEBA_DOS", process.env.NEXT_PUBLIC_PRUEBA_DOS)
  }, [])

  const onSubmit = async (body: IFormLogin) => {
    const { success }: IResponse = await login(body);

    if (success) {
      router.push('/' + constPath.home);
    }
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
