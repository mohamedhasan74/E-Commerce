import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  apiError: string = "";
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router, private _CartService: CartService) { }
  ngOnInit(): void {
    this.loginForm = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,12}$/)]]
    })
  }

  loginHandle(formGroup: FormGroup) {
    if (formGroup.value !== null) {
      this.isLoading = true;
      this._AuthService.loginOperation(formGroup.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message == "success") {
            localStorage.setItem('userToken', response.token);
            this._AuthService.decodeToken();
            this._Router.navigate(['/home'])
            this._CartService.getLoggedUserCart().subscribe({
              next: (response) => {
                this._CartService.numOfProducts.next(response.numOfCartItems);
              }
            })
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.apiError = error.error.message;
        }
      })
    }
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
