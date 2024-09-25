import { Component, OnInit } from '@angular/core';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { HomePageService } from '../../services/home-page.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  saldo: number = 0;
  contoCorrenteId: string = '66eadd7dd264ccbc4e20588b'; // Sostituisci con l'ID reale del conto corrente

  constructor(private homePageService: HomePageService) {}

  ngOnInit(): void {
    this.loadAccountInfo();
  }

  loadAccountInfo(): void {
    this.homePageService.getAccountInfo(this.contoCorrenteId).subscribe({
      next: (data) => {
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
