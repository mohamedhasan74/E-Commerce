import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-verifyresetpassword',
  templateUrl: './verifyresetpassword.component.html',
  styleUrls: ['./verifyresetpassword.component.css']
})
export class VerifyresetpasswordComponent implements OnInit {
  verifyForm!: FormGroup;
  isLoading: boolean = false;
  apiError: string = "";
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router, private _CartService: CartService) { }
  ngOnInit(): void {
    this.verifyForm = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,12}$/)]]
    })
  }

  verifyHandle(formGroup: FormGroup) {
    if (formGroup.value !== null) {
      this.isLoading = true;
      this._AuthService.verifyPassword(formGroup.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.setItem('userToken', response.token);
          this._AuthService.decodeToken();
          this._Router.navigate(['/home'])
          this._CartService.getLoggedUserCart().subscribe({
            next: (response) => {
              this._CartService.numOfProducts.next(response.numOfCartItems);
            }
          })
        },
        error: (error) => {
          this.isLoading = false;
          this.apiError = error.error.message;
        }
      })
    }
  }
  get email() {
    return this.verifyForm.get('email');
  }
  get newPassword() {
    return this.verifyForm.get('newPassword');
  }
}
