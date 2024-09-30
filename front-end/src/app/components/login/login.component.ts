import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  isSubmitted = false;
  private intervalId: any;
  loginError = '';

  constructor(protected fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.refreshPage();
    }, 30000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  refreshPage(): void {
    window.location.reload();
  }
  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authSrv.login(email!, password!)
        .pipe(
          catchError(err => {
            this.loginError = err.error.message;
            return throwError(() => err);   
          })
        )
        .subscribe(() => {
          this.router.navigate(['/home'])
        });
    }
  }
}
