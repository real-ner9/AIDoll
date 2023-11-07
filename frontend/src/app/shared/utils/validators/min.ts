import {ValidatorFn, Validators} from "@angular/forms";

export const min = (value: number, message: string = `Число должно быть больше либо равно ${value}`): ValidatorFn => {
  return (control) => {
    const errors = Validators.min(value)(control);
    return errors && Object.keys(errors).length > 0
      ? {message}
      : null
  };
};


