import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BonificoService } from '../../services/bonifico.service';
import { AuthService } from '../../services/auth.service';
import { ContiCorrenti } from '../../entities/conto-corrente.entity';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrl: './bonifico.component.css',
})
export class BonificoComponent implements OnInit {
  
  bonificoForm = this.fb.group({
    ibanDestinatario: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')],],
    importo: ['', [Validators.required, Validators.min(1)]],
    descrizione: [''],
  })
  isSubmitted = false;
  bonificoError = "";
  bonificoSucc = "";
  userData: any | null = null;

  constructor(
    private fb: FormBuilder,
    private bonificoService: BonificoService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.authSrv.currentUser$.subscribe({
      next: (user) => {
        this.userData = user;
      },
      error: (err) => {
        console.error(
          "Errore nel recupero delle informazioni dell'user",
          err
        );
      },
    });
  }

  onSubmit(): void {
    if (this.bonificoForm.valid) {

      const ibanMittente = this.userData?.IBAN;
      const { ibanDestinatario, importo, descrizione } = this.bonificoForm.value;

      this.bonificoService.effettuaBonifico(ibanMittente!, ibanDestinatario!, importo!, descrizione!)
      .pipe(
        catchError(err => {
          console.log(this.userData.saldo, importo)
          if(this.userData.saldo === 0 || (this.userData.saldo < importo!) || this.userData.saldo === undefined){
            this.bonificoError = "Saldo non sufficiente";
          }else{
            this.bonificoError = "Errore nell'inserimento dei dati";  
          }
          this.bonificoSucc = "";
          return throwError(() => err);  
        })
      )
      .subscribe(
        (response) => {
          this.bonificoSucc = "Bonifico effettuato con successo";
          this.bonificoError = "";  
        }
      );
    }
  }
}
