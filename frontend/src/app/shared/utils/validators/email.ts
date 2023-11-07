import { ValidatorFn, Validators } from "@angular/forms";

export const email = (message = 'Неверный формат ввода'): ValidatorFn => {
  return (control) => {
    const errors = Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")(control);
    return errors && Object.keys(errors).length > 0
      ? { email: message }
      : null;
  };
};
