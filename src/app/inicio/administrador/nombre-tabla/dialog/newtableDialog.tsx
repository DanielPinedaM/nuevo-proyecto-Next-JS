"use client";
import HeaderDialog from "@/components/dialog/HeaderDialog";
import errorNotification from "@/components/dialog/notification/errorNotification";
import successNotification from "@/components/dialog/notification/successNotification";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import { createTable } from "@/services/administrador/tables/nombre-tabla/table-name";
import { globalTailwindStyle } from "@/types/constant/const-layout";
import { constRegex } from "@/types/constant/const-regex";
import {
  constIsStandardGEL,
  constIsStandardMSPS,
  tables,
} from "@/types/constant/tables/const-nombre-tabla";
import { IFormCreateTable } from "@/types/interface/administrador/tablas/DTO/interface-nombre-tabla";
import { IDialogProps, IDropdown } from "@/types/interface/interface-prime-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export default function NewTableDialog({ visible, setVisible }: IDialogProps) {
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormCreateTable>({
    criteriaMode: "all",
  });

  const onSubmit = async (body: IFormCreateTable): Promise<void> => {
    const { success, message } = await createTable(body);

    if (success) {
      router.refresh();
      successNotification(message);
      onHide();
    } else {
      errorNotification(message);
    }
  };

  const onHide = (): void => setVisible?.(false);

  const Footer = () => (
    <div className="flex justify-center gap-x-2 col-span-full">
    <button form="form-new-dialog" type="submit" className={`${globalTailwindStyle.button.darkBlue} uppercase`}>
      aceptar
    </button>

    <button
      className={`${globalTailwindStyle.button.darkBlue} uppercase`}
      onClick={() => onHide()}
    >
      cancelar
    </button>
  </div>
  );

  return (
    <Dialog
      header={<HeaderDialog title="Guardar información" />}
      footer={<Footer />}
      visible={visible}
      draggable={false}
      className={`${globalTailwindStyle.dialog.container.contour} max-w-2xl`}
      onHide={() => onHide()}
    >
      <form id="form-new-dialog" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="col-span-full bg-gray-300 font-semibold rounded-tl-[4px] rounded-tr-[4px] text-black px-3 py-2">
          Fila de Tabla
        </h2>

        <div
          className={`${globalTailwindStyle.dialog.container.content} grid grid-cols-2 gap-2 border-r-2 border-b-2 border-l-2 px-3 mb-2 rounded-bl-md rounded-br-md`}
        >
          <div>
            <label>
              <span className="cursor-pointer">Nombre</span>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Digite nombre",
                  minLength: {
                    value: 3,
                    message: "Nombre es de mínimo 3 caracteres",
                  },
                  pattern: {
                    value: constRegex.text.any,
                    message: "Nombre solo admite letras",
                  },
                }}
                render={({ field, field: { name, value = "", onChange, onBlur } }) => (
                  <InputText
                    {...field}
                    id={name}
                    value={value}
                    onChange={(e) => onChange((e.target.value).trimStart().toLowerCase())}
                    onBlur={onBlur}
                    placeholder="Nombre"
                    className={`${globalTailwindStyle.input.general} block w-full`}
                  />
                )}
              />
            </label>
            <GeneralErrorMessage errors={errors} name="name" />
          </div>

          <div>
            <label>
              <span className="cursor-pointer">Código</span>
              <Controller
                name="code"
                control={control}
                rules={{
                  required: "Digite codigo",
                  min: {
                    value: 1,
                    message: "Código es como minimo 1",
                  },
                }}
                render={({ field, field: { name, value, onChange, onBlur } }) => (
                  <InputNumber
                    {...field}
                    id={name}
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    onBlur={onBlur}
                    useGrouping={false}
                    showButtons
                    placeholder="Código"
                    className={`${globalTailwindStyle.input.general} w-full`}
                  />
                )}
              />
            </label>
            <GeneralErrorMessage errors={errors} name="code" />
          </div>

          <div>
            <label>
              <span className="cursor-pointer">Tabla</span>
              <Controller
                name="table"
                control={control}
                rules={{
                  required: "Seleccione una tabla",
                }}
                render={({ field, field: { name, value, onChange, onBlur } }) => (
                  <Dropdown
                    {...field}
                    id={name}
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    onBlur={onBlur}
                    options={tables.toSorted((a: IDropdown, b: IDropdown) => a.label.localeCompare(b.label, "es-ES"))}
                    placeholder="Seleccionar tabla"
                    className={`${globalTailwindStyle.input.general} w-full`}
                  />
                )}
              />
            </label>
            <GeneralErrorMessage errors={errors} name="table" />
          </div>

          <div>
            <label>
              <span className="cursor-pointer">¿Habilitado?</span>
              <Controller
                name="enabled"
                control={control}
                render={({ field, field: { name, value = false, onChange, onBlur } }) => (
                  <div className="flex gap-x-2">
                    <InputSwitch
                      {...field}
                      id={name}
                      value=""
                      checked={value}
                      onChange={(e) => onChange(e.value)}
                      onBlur={onBlur}
                    />

                    <p
                      className={twMerge(
                        clsx({
                          "text-red-600": value,
                          "text-green-600": !value,
                        }),
                        "uppercase font-semibold"
                      )}
                    >
                      {value ? "si" : "no"}
                    </p>
                  </div>
                )}
              />
            </label>
            <GeneralErrorMessage errors={errors} name="enabled" />
          </div>

          <div>
            <label>
              <span className="cursor-pointer">isStandardGEL</span>
              <Controller
                name="isStandardGEL"
                control={control}
                rules={{
                  required: "Seleccione una opcion en isStandardGEL",
                }}
                render={({ field, field: { name, value, onChange, onBlur } }) => (
                  <Dropdown
                    {...field}
                    id={name}
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    onBlur={onBlur}
                    options={constIsStandardGEL.toSorted((a: IDropdown, b: IDropdown) => a.label.localeCompare(b.label, "es-ES"))}
                    placeholder="Seleccionar isStandardGEL"
                    className={`${globalTailwindStyle.input.general} w-full`}
                  />
                )}
              />
            </label>
            <GeneralErrorMessage errors={errors} name="isStandardGEL" />
          </div>

          <div>
            <label>
              <span className="cursor-pointer">Aplicación</span>
              <Controller
                name="application"
                control={control}
                rules={{
                  required: "Digite aplicación",
                  minLength: {
                    value: 3,
                    message: "Aplicación es de mínimo 3 caracteres",
                  },
                  pattern: {
                    value: constRegex.text.any,
                    message: "Aplicación solo admite letras",
                  },
                }}
                render={({ field, field: { name, value = "", onChange, onBlur } }) => (
                  <InputText
                    {...field}
                    id={name}
                    value={value}
                    onChange={(e) => onChange((e.target.value).trimStart().toLowerCase())}
                    onBlur={onBlur}
                    placeholder="Nombre"
                    className={`${globalTailwindStyle.input.general} block w-full`}
                  />
                )}
              />
            </label>
            <GeneralErrorMessage errors={errors} name="application" />
          </div>

          <div>
            <label>
              <span className="cursor-pointer">isStandardMSPS</span>
              <Controller
                name="isStandardMSPS"
                control={control}
                rules={{
                  required: "Seleccione una opcion en isStandardMSPS",
                }}
                render={({ field, field: { name, value, onChange, onBlur } }) => (
                  <Dropdown
                    {...field}
                    id={name}
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    onBlur={onBlur}
                    options={constIsStandardMSPS.toSorted((a: IDropdown, b: IDropdown) => a.label.localeCompare(b.label, "es-ES"))}
                    placeholder="Seleccionar isStandardMSPS"
                    className={`${globalTailwindStyle.input.general} w-full`}
                  />
                )}
              />
            </label>
            <GeneralErrorMessage errors={errors} name="isStandardMSPS" />
          </div>
        </div>
      </form>
    </Dialog>
  );
}
