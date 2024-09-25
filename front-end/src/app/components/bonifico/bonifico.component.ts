import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BonificoService } from '../../services/bonifico.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrl: './bonifico.component.css',
})
export class BonificoComponent implements OnInit {
  bonificoForm!: FormGroup;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private bonificoService: BonificoService,
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
    this.bonificoForm = this.fb.group({
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
      let bonificoData = this.bonificoForm.value;
      bonificoData.ibanMittente = this.userData.IBAN;
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
