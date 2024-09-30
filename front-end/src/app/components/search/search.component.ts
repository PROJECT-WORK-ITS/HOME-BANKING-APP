import { Component, inject, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HomePageService } from '../../services/home-page.service';
import { SearchService } from '../../services/search.service';
import { MovimentiContiCorrenti } from '../../entities/movimenti-conti-corrente.entity';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  public filter: number = 0;
  userData:any;
	saldo: number = 0;
	movimenti: MovimentiContiCorrenti[] = [];
	filtered: MovimentiContiCorrenti[] = [];

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
	private homePageService: HomePageService,
	private searchService: SearchService
  	) {}
	
	ngOnInit(): void {
		this.authSrv.currentUser$.subscribe({
      next: (data) => {
        this.userData = data;
				this.loadAccountInfo();
      },
      error: (err) => {
        console.error(
          "Errore nel recupero delle informazioni dell'user",
          err
        );
      },
    });  
	}

	loadAccountInfo(): void {
    if (this.userData) {
      this.homePageService.getAccountInfo(this.userData.id).subscribe({
        next: (data) => {
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

	filter1 = this.fb.group({
		nMovimenti: ['', Validators.min(1)],
	});

	onSubmit1(){
		if (this.filter1.value.nMovimenti){
			const formData = this.filter1.value.nMovimenti;
			const n = Number(formData);

			this.searchService.getAllUserMovimenti(this.userData.id).subscribe({
        next: (response) => {
          console.log('Movimenti recuperati con successo', response);
					this.movimenti = response;
					this.movimenti.reverse();
					this.filtered = this.movimenti.slice(0, n);
        },
        error: (error) => {
          console.error('Errore durante il recupero dei movimenti', error);
          // Aggiungi gestione errori, come mostrare un messaggio di errore
        },
      });
			
		}
	}

	filter2 = this.fb.group({
		nMovimenti: ['', Validators.min(1)],
		categoria: ['', Validators.required],
	});

	onSubmit2(){
		if (this.filter2.value.nMovimenti){
			this.filtered = [];
			const formData = this.filter2.value;
			const n = Number(formData.nMovimenti);

			this.searchService.getAllUserMovimenti(this.userData.id).subscribe({

        next: (response) => {
					console.log(response)
          console.log('Movimenti recuperati con successo', response);
					this.movimenti = response;
					this.movimenti.reverse();
					let i = 0;
					this.movimenti.forEach(m =>{
						if(m.categoriaMovimentoId.id === formData.categoria){
							this.filtered[i] = m;
							i++;
						}
					});
					this.filtered = this.filtered.slice(0, n);
        },
        error: (error) => {
          console.error('Errore durante il recupero dei movimenti', error);
          // Aggiungi gestione errori, come mostrare un messaggio di errore
        },
      });
			
		}
	}

	filter3 = this.fb.group({
		nMovimenti: ['', Validators.min(1)],
		dataInizio: ['', Validators.required],
		dataFine: ['', Validators.required],
	});
	
	onSubmit3(){
		if (this.filter3.value.nMovimenti && this.fromDate && this.toDate){
			this.filtered = [];
			const formData = this.filter3.value;
			const n = Number(formData.nMovimenti);

			this.searchService.getAllUserMovimenti(this.userData.id).subscribe({
        next: (response) => {
          console.log('Movimenti recuperati con successo', response);
					this.movimenti = response;
					this.movimenti.reverse();
					let i = 0;
					this.movimenti.forEach(m =>{
						const data = new Date(m.data);
						const dataNgb: NgbDateStruct = {day: data.getDate(), month: (data.getMonth()+1), year: data.getFullYear()};
						console.log(dataNgb, this.fromDate, this.toDate)
						console.log(this.fromDate?.before(dataNgb) , this.toDate?.after(dataNgb))
						if((this.fromDate?.before(dataNgb) || this.fromDate?.equals(dataNgb)) && (this.toDate?.after(dataNgb) || this.toDate?.equals(dataNgb))){
							this.filtered[i] = m;
							i++;
						}
					});
					this.filtered = this.filtered.slice(0, n);
        },
        error: (error) => {
          console.error('Errore durante il recupero dei movimenti', error);
          // Aggiungi gestione errori, come mostrare un messaggio di errore
        },
      });
			
		}
	}

  selectedFilter(nfilter: number){
    this.filter = nfilter;
  }

  calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
}
