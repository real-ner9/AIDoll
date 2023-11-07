import { ValidatorFn, Validators } from "@angular/forms";

export const url = (message = 'Поле должно содержать корректную ссылку'): ValidatorFn => {
  return (control) => {
    const errors = Validators.pattern('(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?')(control);
    return errors && Object.keys(errors).length > 0
      ? { url: message }
      : null;
  };
};
