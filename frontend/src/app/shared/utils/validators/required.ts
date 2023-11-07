import { ValidatorFn, Validators } from "@angular/forms";

export const required = (message = 'Поле является обязательным для заполнения'): ValidatorFn => {
  return (control) => {
    if (typeof control.value === 'string' && control.value.trim().length === 0) {
      return { required: message };
    }
    const errors = Validators.required(control);
    return errors && Object.keys(errors).length > 0
      ? { required: message }
      : null;
  };
}
