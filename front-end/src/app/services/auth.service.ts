import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs"
import { JWTService } from "./jwt.service";
import { ContiCorrenti } from '../entities/conto-corrente.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser$ = new BehaviorSubject<ContiCorrenti | null>(null);
  currentUser$ = this._currentUser$.asObservable();


  constructor(private jwtSrv: JWTService,
              private http: HttpClient,
              private router: Router) {
    this.fetchConto();
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  login(email: string, password: string) {
    return this.http.post<{user: ContiCorrenti, token: string}>('/api/login', {email, password})
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
        map(res => res.user)
      );
  }
  
  register(email: string, password: string, firstName: string, lastName: string) {
    return this.http.post<ContiCorrenti>('/api/register', {firstName, lastName, email, password});
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/']);
  }

  private fetchConto() {
    this.http.get<ContiCorrenti>('/api/conti-correnti/me')
      .subscribe(user => this._currentUser$.next(user));
  }
  
  updateIBAN(contoId: string, IBAN: string) {
    return this.http.patch<ContiCorrenti>('/api/conti-correnti/IBAN', {contoId, IBAN});
  }
  
}
