import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BonificoService {
  private apiUrl = 'http://localhost:3000/api/movimenti-conti-correnti'; // URL dell'API

  constructor(private http: HttpClient) {}

  effettuaBonifico(bonificoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bonifico`, bonificoData);
  }
}
