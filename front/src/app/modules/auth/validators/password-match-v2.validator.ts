import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchV2Validator: ValidatorFn = (formControl: FormControl): ValidationErrors | null => {
  if (formControl.parent && formControl.parent.get('new_password').value === formControl.parent.get('password_verification').value) {
    return null;
  }
  return { passwordMismatch: true };
};
