import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  resetpasswordForm: FormGroup;
  apiError: any = '';
  isLoading = false;
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) {
    this.resetpasswordForm = this._FormBuilder.group({
      resetCode: [null, [Validators.required]]
    })
  }
  resetHandle(formGroup: FormGroup) {
    this.isLoading = true;
    this._AuthService.resetPassword(formGroup.value).subscribe({
      next: (respons) => {
        this.isLoading = false;
        if (respons.status == "Success") {
          this._Router.navigate(['/verifyresetpassword']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.apiError = error.error.message
      }
    })
  }

  get resetCode() {
    return this.resetpasswordForm.get('resetCode');
  }
}
