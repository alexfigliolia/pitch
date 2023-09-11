export class Validators {
  static zipRegex = /^[0-9]*$/;
  static stateRegex = /^[a-zA-Z]*$/;
  static floatRegex = /^[1-9]\d*(\.\d+)?$/;
  static addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
  static nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  static emailRegex =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  static baseValidator = (value: string) => {
    if (!value.length) {
      return null;
    }
    return value.length > 2;
  };

  public static validName = (value: string) => {
    if (!value.length) {
      return null;
    }
    return !!value.match(this.nameRegex);
  };

  public static validEmail = (value: string) => {
    if (!value.length) {
      return null;
    }
    return !!value.match(this.emailRegex);
  };

  public static validPassword = (value: string) => {
    if (!value.length) {
      return null;
    }
    return value.length >= 5;
  };

  static dateValidator = (value: string) => {
    if (!value.length) {
      return null;
    }
    return value.length === 10;
  };

  static floatValidator = (value: string) => {
    if (!value.length) {
      return null;
    }
    return this.floatRegex.test(value);
  };

  static validateAddress = (value: string) => {
    const baseResult = this.baseValidator(value);
    if (!baseResult) {
      return baseResult;
    }
    return this.addressRegex.test(value);
  };

  static validateState = (value: string) => {
    if (!value.length) {
      return null;
    }
    return this.stateRegex.test(value);
  };

  static validateZipCode = (value: string) => {
    if (!value.length) {
      return null;
    }
    return value.length === 5 && this.zipRegex.test(value);
  };

  static numberValidator = (value: any) => {
    // @ts-ignore
    return parseFloat(value) == value; // eslint-disable-line
  };
}
