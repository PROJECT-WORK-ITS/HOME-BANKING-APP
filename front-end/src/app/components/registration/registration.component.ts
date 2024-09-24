import { AnimationDriver } from '@angular/animations/browser';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { catchError, flatMap, throwError } from 'rxjs';
import { otpService } from '../../services/otp.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  public tab: number = 1;
  registerError: string = '';
  otpError: string = '';

  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required]
  });

  otpForm = this.fb.group({
    otp: [null, [Validators.required]]
  });


  isSubmitted = false;
    
  constructor(protected fb: FormBuilder,
              protected otpService: otpService,
              protected authSrv: AuthService
  ) { }

  public nextTab(nTab: number){
    this.tab = nTab + 1;
  }

  private checkMatchPassword(password: string | null=null, confPassword: string | null = null) {
    if(password === confPassword){
      return true
    }
    else {
      this.registerError = "Le password non coincidono";
      return false;
    }
      
  }

  registerSubmit() {
    this.isSubmitted = true;

    if (this.signUpForm.valid) {
      
      if (this.checkMatchPassword(this.signUpForm.get('password')?.value, this.signUpForm.get('confirmpassword')?.value)) {

        const { email, password, name, surname } = this.signUpForm.value;
        this.authSrv.register(email!, password!, name!, surname!)
        .pipe(
          catchError(err => {
            this.registerError = err.error.message || 'Email already in use';  
            return throwError(() => err);  
          })
        )
        .subscribe(contoCorrente => {
          if (contoCorrente) {
            this.registerError = "";
            console.log(this.signUpForm.get('email')?.value!)
            this.otpService.send(this.signUpForm.get('email')?.value!).subscribe( () => {
              this.nextTab(1);
              this.isSubmitted = false;
            });
            
          }
        });
          
      }
    }
  }

  otpSubmit() {
    this.isSubmitted = true;

    if (this.otpForm.valid) {

      this.otpService.verify(this.signUpForm.get('email')?.value!, this.otpForm.get('otp')?.value!)
      .pipe(
        catchError(err => {
          this.otpError = err.error.message;
          return throwError(() => err);   
        })
      )
      .subscribe((otp) => {
        console.log(otp)
        if (otp.valid) {
          this.isSubmitted = false;
          
        }
      });

    }

  }

}
