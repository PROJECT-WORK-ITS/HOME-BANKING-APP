import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BonificoService {
  private apiUrl = '/api/movimenti-conti-correnti'; // URL dell'API

  constructor(private http: HttpClient) {}


  effettuaBonifico(ibanMittente: string, ibanDestinatario: string, importo: string, descrizione: string) {
    return this.http.post(`${this.apiUrl}/bonifico`, {ibanMittente, ibanDestinatario, importo, descrizione});
  }

  creaPrimoMovimento(contoCorrenteId: string) {
    return this.http.post(`${this.apiUrl}/primomovimento`, {contoCorrenteId})
  }
}
