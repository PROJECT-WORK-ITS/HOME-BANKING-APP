import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Otp } from '../entities/otp.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class otpService {

  constructor(protected http: HttpClient) {}

  send(email: string) {
    return this.http.post<Otp>('/api/otp/send', {email});
  }

  verify(email: string, otpN: number) {
    const otp: string = otpN.toString();
    return this.http.post<Otp>('/api/otp/verify', {email, otp})
  }

}
