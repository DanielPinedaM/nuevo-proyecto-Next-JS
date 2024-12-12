export default interface IRegExp {
  number: {
    integerOrDecimal: RegExp;
    positiveInteger: RegExp;
  };
  text: {
    any: RegExp;
    email: RegExp;
    strongPassword: RegExp;
  };
}
