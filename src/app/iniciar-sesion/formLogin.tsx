'use client';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import IFormLogin from '../types/interface/interface-login';
import GeneralErrorMessage from '../components/GeneralErrorMessage';
import { useRouter } from 'next/navigation';
import { constPath } from '../types/constant/const-path';
import { httpRequest } from '../api/generalServiceHttp';
import { constRegExp } from '../types/constant/const-reg-exp';
import { IResponse } from '../types/interface/interface-response';
import { globalTailwindStyle } from '../types/constant/const-layout';

export default function FormLogin() {
  const { register, formState: { errors }, handleSubmit } = useForm<IFormLogin>({
    criteriaMode: 'all',
  });

  const router = useRouter();

  const onSubmit = async (body: IFormLogin) => {
    try {
      const { success, message }: IResponse = await httpRequest('POST', process.env.NEXT_PUBLIC_ENVIRONMENT, {
        body,
      });

      if (success) {
        router.push('/' + constPath.home + '/' + constPath.home);
      } else {
        console.error('❌ error \n', message);
      }
    } catch (error) {
      console.error('❌ error \n', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-2'>
        <label>
          <p className='cursor-pointer'>Correo electrónico</p>
          <InputText
            placeholder='Correo electrónico'
            className={`${globalTailwindStyle.input.general} block w-full`}
            {...register('user', {
              required: 'Digite correo electrónico',
              pattern: {
                value: constRegExp.text.email,
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
            })}
          />
        </label>
        <GeneralErrorMessage errors={errors} name='user' />
      </div>

      <div className='mb-2'>
        <label>
          <p className='cursor-pointer'>Contraseña</p>
          <InputText
            placeholder='Contraseña'
            className={`${globalTailwindStyle.input.general} block w-full`}
            {...register('password', {
              required: 'Digite contraseña',
              pattern: {
                value: constRegExp.text.strongPassword,
                message: "contraseña insegura, debe contener un caracter especial, un número, una mayúscula y una minúscula",
              }
            })}
          />
        </label>
        <GeneralErrorMessage errors={errors} name='password' />
      </div>

      <div className='flex justify-end'>
        <button type='submit' className={`${globalTailwindStyle.button}`}>
          INGRESAR
        </button>
      </div>
    </form>
  );
}
