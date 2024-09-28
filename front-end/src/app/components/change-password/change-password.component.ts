import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  changePass = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required]
  });
  isSubmitted = false;
  changePassErr = '';
  changePassSub = '';

  constructor(protected fb: FormBuilder,
              protected authSrv: AuthService){}

  changePassSubmit() {
    this.isSubmitted = true;

    if (this.changePass.valid) {
        const { oldPassword, newPassword } = this.changePass.value;
        this.authSrv.changePassword(oldPassword!, newPassword!)
        .pipe(
          catchError(err => {
            this.changePassErr = err.error.message;  
            this.changePassSub = "";
            return throwError(() => err);  
          })
        )
        .subscribe(() => {
            this.changePassErr = "";
            this.changePassSub = "Password cambiata";
        });
    }
  }

}
