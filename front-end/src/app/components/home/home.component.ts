import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page.service';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import { MovimentiContiCorrenti } from '../../entities/movimenti-conti-corrente.entity';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public saldo: number = 0;
  public saldoNascosto: boolean = true;
  public userData: any;
  public movimenti: MovimentiContiCorrenti[] = [];

  constructor(
    private homePageService: HomePageService,
    private authSrv: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.authSrv.currentUser$.subscribe({
      next: (data) => {
        this.userData = data;
        this.loadAccountInfo();
        this.searchService.getAllUserMovimenti(this.userData.id).subscribe({
          next: (response) => {
            console.log('Movimenti recuperati con successo', response);
            this.movimenti = response;
            this.movimenti.reverse();
            this.movimenti = this.movimenti.slice(0, 5);
          },
          error: (error) => {
            console.error('Errore durante il recupero dei movimenti', error);
            // Aggiungi gestione errori, come mostrare un messaggio di errore
          },
        });
      },
      error: (err) => {
        console.error("Errore nel recupero delle informazioni dell'user", err);
      },
    });
    
  }

  loadAccountInfo(): void {
    if (this.userData) {
      this.homePageService.getAccountInfo(this.userData.id).subscribe({
        next: (data) => {
          console.log(data);
          this.saldo = data.saldo;
        },
        error: (err) => {
          console.error(
            "Errore nel recupero delle informazioni dell'account",
            err
          );
        },
      });
    }
  }

  public nascondiSaldo(condition: boolean) {
    this.saldoNascosto = condition;
  }
}
