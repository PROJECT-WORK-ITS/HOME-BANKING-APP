import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public saldo: number = 0;
  public saldoNascosto: boolean = true;
  public userData: any;

  constructor(
    private homePageService: HomePageService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.authSrv.currentUser$.subscribe({
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
