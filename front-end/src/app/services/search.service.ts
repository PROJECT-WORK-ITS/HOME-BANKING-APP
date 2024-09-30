import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private apiUrl =
    'http://localhost:3000/api/movimenti-conti-correnti/allUserMovimenti';

  constructor(private http: HttpClient) {}

  getAllUserMovimenti(contoCorrenteId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${contoCorrenteId}`);
  }
}
