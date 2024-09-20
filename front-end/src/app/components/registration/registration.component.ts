import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  public tab: number = 1;
  
  public nextTab(nTab: number){
    this.tab = nTab + 1;
  }

}
