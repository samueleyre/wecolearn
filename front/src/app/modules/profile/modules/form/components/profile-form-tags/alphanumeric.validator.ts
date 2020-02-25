import { AbstractControl, ValidatorFn } from '@angular/forms';

export function alphaNumericValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null;
    }
    const allowed = /^[a-zA-Z0-9& \u00C0-\u024F\u1E00-\u1EFF']+$/i.test(control.value);
    return allowed ? null : { notAlphaNumeric: true };
  };
}
