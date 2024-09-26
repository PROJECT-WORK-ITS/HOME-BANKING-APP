import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private apiUrl =
    'http://localhost:3000/api/movimenti-conti-correnti/ultimoMovimento';

  constructor(private http: HttpClient) {}

  getAccountInfo(contoCorrenteId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${contoCorrenteId}`);
  }
}
