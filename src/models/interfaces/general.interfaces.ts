/*
 *******************************************************************
 * interface generales q se usan en varias partes de la pagina web *
 ******************************************************************* */

import { ToastPosition } from "react-hot-toast";

/**
opciones de mensaje emergente */
export interface IOptionsReactHotToast {
  duration?: number;
  position?: ToastPosition;
}
