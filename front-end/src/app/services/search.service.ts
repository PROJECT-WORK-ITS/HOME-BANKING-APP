import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimentiContiCorrenti } from '../entities/movimenti-conti-corrente.entity';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private apiUrl =
    '/api/movimenti-conti-correnti/allUserMovimenti';

  constructor(private http: HttpClient) {}

  getAllUserMovimenti(contoCorrenteId: any) {
    return this.http.get<MovimentiContiCorrenti[]>(`${this.apiUrl}/${contoCorrenteId}`);
  }
}
