import {ValidatorFn, Validators} from "@angular/forms";

export const max = (value: number, message: string = `Число должно быть меньше либо равно ${value}`): ValidatorFn => {
  return (control) => {
    const errors = Validators.max(value)(control);
    return errors && Object.keys(errors).length > 0
      ? {message}
      : null
  };
};
