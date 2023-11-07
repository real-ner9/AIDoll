import {ValidatorFn} from "@angular/forms";

export const minLength = (length:Number, message = 'Поле должно иметь минимум %d% символов'): ValidatorFn => {
  return (control) => {
    if (typeof control.value === 'string' && control.value.trim().length < length) {
      return { minLength: message.replace("%d%", String(length))};
    }
    return null;
  };
}

export const minLengthOrEmpty = (length:Number, message = 'Поле должно иметь минимум %d% символов'): ValidatorFn => {
  return (control) => {
    if (typeof control.value === 'string' && control.value.trim().length > 0 &&  control.value.trim().length < length) {
      return { minLength: message.replace("%d%", String(length))};
    }
    return null;
  };
}

