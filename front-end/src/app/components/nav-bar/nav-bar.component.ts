import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ContiCorrenti } from '../../entities/conto-corrente.entity';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  currentUser$ = this.authSrv.currentUser$;
  contoCorrente: ContiCorrenti | null = null;

  constructor(protected authSrv: AuthService) {}

  ngOnInit() {
    // Subscribe per ottenere il valore dell'utente corrente
    this.authSrv.currentUser$.subscribe(conto => {
      this.contoCorrente = conto;
      console.log('Utente corrente:', this.contoCorrente);
    });
  }
  logout() {
    this.authSrv.logout();
  }
}
