import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { MovimentiContiCorrenti } from '../../entities/movimenti-conti-corrente.entity';
import { AuthService } from '../../services/auth.service';
import { ContiCorrenti } from '../../entities/conto-corrente.entity';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  public idMovimento!: any;
  public movimenti: MovimentiContiCorrenti[] = [];
  public movimento: MovimentiContiCorrenti | undefined;
  public userData: ContiCorrenti | null = null;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.authSrv.currentUser$.subscribe({
      next: (data) => {
        this.userData = data;

        const id = this.route.snapshot.paramMap.get('id'); // Get the route parameter
        if (id) {
          this.idMovimento = id; // Convert to number
        }
        this.searchService.getAllUserMovimenti(this.userData!.id).subscribe({
          next: (response) => {
            this.movimenti = response;
            this.movimenti.reverse();
            this.movimento = this.movimenti.find(
              (m) => m.id == this.idMovimento
            );
          },
          error: (error) => {
            // Aggiungi gestione errori, come mostrare un messaggio di errore
          },
        });
      },
      error: (err) => {
        console.error("Errore nel recupero delle informazioni dell'user", err);
      },
    });
    
  }
}
