/* eslint-disable @typescript-eslint/no-explicit-any */

/**
props q tienen TODAS las ventanas modales de Prime React */
export interface IDialogProps {
  // ID de la fila actual a la q el usuario da click en la tabla
  id?: string | undefined;

  // booleano q controla si ocultar o mostrar la modal
  visible?: boolean;

  // funcion q setea cuando esta "visible" la modal
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;

  // función para cerrar la modal
  onHide?: () => void;
}

/**
Prime React - titulo <h1> y sub-titulo <h2> de las ventanas modales */
export interface ITitles {
  title: string;
  subtitle?: string;
}

/**
Prime React - tipo de dato de los <select> - <Dropdown>  */
export interface IDropdown {
  label: string;
  value: string | number;
}

/**
Prime React - tipo de dato de los <Checkbox> */
export interface ICheckbox {
  name: string;
  key: string;
}

/**
Prime React - tipo de dato para mostrar componente con tooltip */
export interface IPrimeReactTooltip {
  // nombre de la clase a la cual esta asociada el tooltip
  target: string;

  // texto del tooltip
  content?: string;

  // lugar donde se ubica el tooltip, undefined es automatico
  position?: "top" | "bottom" | "left" | "right" | "mouse" | undefined;
}

/**
Prime React - ventana modal con una pregunta */
export interface IQuestionNotification extends IDialogProps {
  message: string;            // mensaje que se mostrará en el modal
  onClickAccept: () => void;  // función que se ejecutará cuando se haga clic en "Sí"
  onClickCancel?: () => void; // función que se ejecutará cuando se haga clic en "No"
}

