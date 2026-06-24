const CONST_REGEX = {
  number: {
    // valida numeros enteros, negativos y decimales con coma y punto
    integerOrDecimal: /^(-?\d{0,}(\,|\.)?){0,}$/,

    // solamente admite numero entero NO negativo
    positiveInteger: /^[0-9]+$/,
  },
  text: {
    // admite mayuscula, minuscula, tilde, Ñ, ñ
    any: /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/,

    // valida correo electronico
    email:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,

    // contraseña segura debe contener un caracter especial, un número, una mayúscula y una minúscula
    strongPassword:
      /^(?=.[!@#$%^&()_+\[\]{};':"\\|,.<>/?])(?=.[0-9])(?=.[A-ZÑÁÉÍÓÚ])(?=.*[a-zñáéíóú])/,
  },
};

export default CONST_REGEX;
