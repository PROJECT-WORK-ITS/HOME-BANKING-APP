import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../services/credit-card.service';
import { AuthService } from '../../services/auth.service';
import { ContiCorrenti } from '../../entities/conto-corrente.entity';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css',
})
export class CreditCardComponent implements OnInit {
  isFlipped = false;
  public saldo: string = '';
  public saldoNascosto: boolean = true;
  public userData: ContiCorrenti | null = null;

  constructor(
    private creditCardService: CreditCardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (data) => {
        this.userData = data;
        this.loadAccountInfo();
      },
      error: (err) => {
        console.error("Errore nel recupero delle informazioni dell'user", err);
      },
    });
  }

  loadAccountInfo(): void {
    if (this.userData) {
      this.creditCardService.getAccountInfo(this.userData.id!).subscribe({
        next: (data) => {
          console.log(data);
          this.saldo = data.saldo;
          console.log(this.saldo);
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

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}
