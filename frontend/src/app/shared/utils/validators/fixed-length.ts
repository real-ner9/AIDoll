import {ValidatorFn} from "@angular/forms";

export const fixedLength = (length:Number[], message = 'Поле должно содержать %d% символов'): ValidatorFn => {
  return (control) => {
    if (typeof control.value === 'string' && !length.find(i => control.value.trim().length === i)) {
      return { maxLength: message.replace("%d%", String(length.join(' или ')))};
    }
    return null;
  };
}
