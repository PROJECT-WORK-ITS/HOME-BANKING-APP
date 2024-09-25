import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RicaricaService {
  private apiUrl =
    'http://localhost:3000/api/movimenti-conti-correnti/ricarica';

  constructor(private http: HttpClient) {}

  effettuaRicarica(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
