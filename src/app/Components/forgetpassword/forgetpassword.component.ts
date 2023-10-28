import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  forgetpasswordForm: FormGroup;
  apiError: any = '';
  isLoading = false;
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) {
    this.forgetpasswordForm = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  forgetHandle(formGroup: FormGroup) {
    this.isLoading = true;
    this._AuthService.forgetPassword(formGroup.value).subscribe({
      next: (respons) => {
        if (respons.statusMsg == "success") {
          this.isLoading = false;
          this._Router.navigate(['/resetpassword']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.apiError = error.error.message
      }
    })
  }

  get email() {
    return this.forgetpasswordForm.get('email');
  }
}
