import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms"

export const confirmPasswordMatched: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if (password?.value == rePassword?.value || !/^[A-Z][a-zA-Z0-9]{5,11}$/.test(rePassword?.value) || password?.untouched)
        return null;
    else {
        rePassword?.setErrors({ notMatched: "Invalid Not Matched Password" });
        return { notMatched: "Invalid Not Matched Password" };
    }
};