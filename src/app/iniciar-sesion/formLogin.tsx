/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import errorNotification from "@/components/dialog/notification/errorNotification";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import { cookieOptionsInLogin } from "@/models/constants/cookie-storage.constants";
import { globalTailwindStyle } from "@/models/constants/layout.constants";
import { constRegex } from "@/models/constants/regex.constants";
import IFormLogin from "@/models/interfaces/login.interfaces";
import { IResponse } from "@/services/generalService/types/request-data.types";
import { login } from "@/services/auth/auth.services";
import { IRequestOptions } from "@/services/generalService/types/request-data.types";
import { useNavigationLoaderStore } from "@/store/loader/navigationLoaderStore";
import { encrypt } from "@/utils/func/cryptoService.utils";
import {
  forceConvertToString,
  isLiteralObject,
  literalObjectLength,
} from "@/utils/func/dataType.utils";
import { sessionStorageDeleteAll } from "@/utils/func/sessionStorage.utils";
import { deleteCookie, getCookies, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function FormLogin() {
  const { showLoaderNavigation } = useNavigationLoaderStore();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormLogin>({
    criteriaMode: "all",
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
    if (!data) {
      console.error(
        "❌ error, NO se puede setear las cookies porque la api ha respondido con un valor falsy\n",
        data
      );
      return;
    }

    if (!isLiteralObject(data)) {
      console.error(
        "❌ error, NO se puede setear las cookies porque la api NO ha respondido con un objeto literal\n",
        data
      );
      return;
    }

    if (literalObjectLength(data) <= 0) {
      console.error(
        "❌ error, NO se puede setear las cookies porque la api ha respondido con un objeto literal vacio\n",
        data
      );
      return;
    }

    // el tiempo de expiracion de las cookies en front y el token en back son los mismos
    const maxAge: number = data?.expiresIn;

    if (!maxAge) {
      console.error(
        "❌ error, NO se puede setear las cookies porque la api no ha respondido con el tiempo de expiracion de las cookies\n",
        maxAge
      );
      return;
    }

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (!key || !value) {
        console.error(
          "❌ error, NO se puede setear las cookies porque una key ó value es falsy",
          "\nkey ",
          key,
          "\nvalue ",
          value
        );
        return;
      }

      setCookie(key, forceConvertToString(value), cookieOptionsInLogin({ maxAge }));
    });
  };

  const onSubmit = async (formData: IFormLogin): Promise<void> => {
    //des-comentar lo q esta comentado a continuacion para hacer peticion http de iniciar sesion

    /* const { user, password } = formData;

     const optionsApi: IRequestOptions = {
      body: {
    user: user.trim(),
      password: await encrypt(password!.trim()),
      }
    }

    const { success, message, data }: IResponse = await login(optionsApi);

    if (success) { */
    // este codigo se tiene q borrar porq queme los datos
    iterateUserData({
      expiresIn: 7200,
      accessToken: "aqui va el token",
    });

    /* este es el codigo correcto q se tiene q des-comentar
    iterateUserData(data); */

    showLoaderNavigation();
    router.push("/inicio/administrador");
    //} else {
    //deleteStorageAndCookies();
    //errorNotification(message);
    //}
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-2">
          <label>
            <span className="cursor-pointer">Correo electrónico</span>
            <Controller
              name="user"
              control={control}
              rules={{
                required: "Digite correo electrónico",
                pattern: {
                  value: constRegex.text.email,
                  message: "Correo electrónico invalido",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "Máximo 30 caracteres",
                },
              }}
              render={({ field, field: { name, value = "", onChange, onBlur } }) => (
                <InputText
                  {...field}
                  id={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  placeholder="nombre@correo.com"
                  className={`${globalTailwindStyle.input.general} block w-full`}
                />
              )}
            />
          </label>
          <GeneralErrorMessage errors={errors} name="user" />
        </div>

        <div className="mb-2">
          <label>
            <span className="cursor-pointer">Contraseña</span>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Digite contraseña",
              }}
              render={({ field, field: { name, value = "", onChange, onBlur } }) => (
                <Password
                  {...field}
                  id={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  variant="filled"
                  feedback={false}
                  placeholder="Contraseña"
                  className={`${globalTailwindStyle.input.general}`}
                />
              )}
            />
          </label>
          <GeneralErrorMessage errors={errors} name="password" />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            ingresar
          </button>
        </div>
      </form>
    </>
  );
}
