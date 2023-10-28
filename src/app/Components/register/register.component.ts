import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { confirmPasswordMatched } from 'src/app/Validation/confirmPasswordMathed.validayion';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  apiError: string = "";
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) {

  }
  ngOnInit(): void {
    this.registerForm = this._FormBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,12}$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,11}$/)]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    }, { validators: confirmPasswordMatched })
  }
  registerHandle(registerForm: FormGroup) {
    if (registerForm.value !== null) {
      this.isLoading = true;
      this._AuthService.registerOperation(registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message == "success")
            this._Router.navigate(['/login'])
        },
        error: (error) => {
          this.isLoading = false;
          this.apiError = error.error.message;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get rePassword() {
    return this.registerForm.get('rePassword');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
}
