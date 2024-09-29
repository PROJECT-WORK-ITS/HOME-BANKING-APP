import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RicaricaService } from '../../services/ricarica.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ricarica',
  templateUrl: './ricarica.component.html',
  styleUrls: ['./ricarica.component.css'],
})
export class RicaricaComponent implements OnInit {
  ricaricaForm!: FormGroup;
  userData:any;

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
      console.log('Dati del form:', ricaricaData);

      // Invia i dati al servizio per la richiesta al backend
      this.ricaricaService.effettuaRicarica(ricaricaData).subscribe({
        next: (response) => {
          console.log('Ricarica effettuata con successo', response);
          // Aggiungi eventuali logiche di successo, come visualizzare un messaggio all'utente
        },
        error: (error) => {
          console.error('Errore durante la ricarica', error);
          // Aggiungi gestione errori, come mostrare un messaggio di errore
        },
      });
    }
  }
}
