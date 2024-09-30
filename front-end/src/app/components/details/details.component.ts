import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { MovimentiContiCorrenti } from '../../entities/movimenti-conti-corrente.entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  public idMovimento!:any;
  public movimenti: MovimentiContiCorrenti []=[];
  public movimento: MovimentiContiCorrenti | undefined ;
  public userData: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.authSrv.currentUser$.subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error(
          "Errore nel recupero delle informazioni dell'user",
          err
        );
      },
    });  
    const id = this.route.snapshot.paramMap.get('idMovimento'); // Get the route parameter
    if (id) {
      this.idMovimento = +id; // Convert to number
      console.log(this.idMovimento)
    }

    this.searchService.getAllUserMovimenti(this.userData.id).subscribe({
      next: (response) => {
        console.log('Movimenti recuperati con successo', response);
        this.movimenti = response;
        this.movimenti.reverse();
        this.movimento = this.movimenti.find(m => m.movimentoId === this.idMovimento);
      },
      error: (error) => {
        console.error('Errore durante il recupero dei movimenti', error);
        // Aggiungi gestione errori, come mostrare un messaggio di errore
      },
    });
  }
}
