import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RicaricaService } from '../../services/ricarica.service';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-ricarica',
  templateUrl: './ricarica.component.html',
  styleUrls: ['./ricarica.component.css'],
})
export class RicaricaComponent implements OnInit {
  ricaricaForm!: FormGroup;
  userData:any;
  ricaricaError = ""
  ricaricaSub = ""

  constructor(
    private fb: FormBuilder,
    private ricaricaService: RicaricaService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
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
    this.ricaricaForm = this.fb.group({
      numeroTelefono: [
        '',
        [Validators.required, Validators.pattern(/^(\+39)?\d{10}$/)],
      ], // Valida il numero di telefono italiano
      operatore: ['', Validators.required],
      importo: ['', Validators.required],
    });
  }

  // Metodo che viene chiamato al submit del form
  onSubmit(): void {
    if (this.ricaricaForm.valid) {
      const ricaricaData = {
        contocorrenteId: this.userData.id,
        importo: this.ricaricaForm.value.importo,
        descrizione:''
      };

      // Invia i dati al servizio per la richiesta al backend
      this.ricaricaService.effettuaRicarica(ricaricaData).pipe(
        catchError(err => {
          if(this.userData.saldo === 0 || (this.userData.saldo < ricaricaData.importo) || this.userData.saldo === undefined){
            this.ricaricaError = "Saldo non sufficiente";
          }else{
            this.ricaricaError = "Errore nell'inserimento dei dati";  
          }
          this.ricaricaSub = "";
          return throwError(() => err);  
        })
      )
      .subscribe(
        () => {
          this.ricaricaSub = "Ricarica effettuato con successo";
          this.ricaricaError = ""; 
        }
      );
    }
  }
}
