import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit {
  public userData: any;

  constructor(
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.authSrv.currentUser$.subscribe({
      next: (data) => {
        this.userData = data;
        console.log(this.userData)
      },
      error: (err) => {
        console.error(
          "Errore nel recupero delle informazioni dell'user",
          err
        );
      },
    });
  }
  
  
}
