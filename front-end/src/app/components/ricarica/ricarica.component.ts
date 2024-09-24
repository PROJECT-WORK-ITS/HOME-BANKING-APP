import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RicaricaService } from '../../services/ricarica.service';

@Component({
  selector: 'app-ricarica',
  templateUrl: './ricarica.component.html',
  styleUrls: ['./ricarica.component.css'],
})
export class RicaricaComponent implements OnInit {
  ricaricaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ricaricaService: RicaricaService
  ) {}

  ngOnInit(): void {
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
      const ricaricaData = this.ricaricaForm.value;
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
