import {ValidatorFn} from "@angular/forms";

export const maxLength = (length:Number, message = 'Поле должно иметь максимум %d% символов'): ValidatorFn => {
  return (control) => {
    if (typeof control.value === 'string' && control.value.trim().length > length) {
      return { maxLength: message.replace("%d%", String(length))};
    }
    return null;
  };
}
