import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BonificoService } from '../../services/bonifico.service';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrl: './bonifico.component.css',
})
export class BonificoComponent implements OnInit {
  bonificoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bonificoService: BonificoService
  ) {}

  ngOnInit(): void {
    this.bonificoForm = this.fb.group({
      ibanMittente: [
        '',
        [Validators.required, Validators.pattern('^[A-Z0-9]+$')],
      ],
      ibanDestinatario: [
        '',
        [Validators.required, Validators.pattern('^[A-Z0-9]+$')],
      ],
      importo: ['', [Validators.required, Validators.min(1)]],
      descrizione: [''],
    });
  }

  onSubmit(): void {
    if (this.bonificoForm.valid) {
      const bonificoData = this.bonificoForm.value;
      this.bonificoService.effettuaBonifico(bonificoData).subscribe(
        (response) => {
          console.log('Bonifico effettuato con successo!', response);
        },
        (error) => {
          console.error('Errore durante il bonifico:', error);
        }
      );
    }
  }
}
