import { Component, signal } from '@angular/core';

import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  // i japin vler 5 input nga [(ngModel)]="enteredExpectedReturn" sepse jemi duke perdorur Two - way binding
  enteredExpectedReturn = signal('5'); 
  enteredDuration = signal('10');

  constructor(private investmentService: InvestmentService) {}
  
  // *** NOTE: si e lexon kodi vet veten: 

  onSubmit() { //1.  marim te dhenat nga [(ngModel)] te cilat i bashkagjisim ne calculateInvestmentResults()
    this.investmentService.calculateInvestmentResults({
      // signal i ruan vlerat ne string, kesthu qe e konvertojme ne vler number me ndimen e ' + ';
      initialInvestment: +this.enteredInitialInvestment(),  
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment(),
    });

    // 8. kur funksjoni mesiper ka kalur me sukse, kodi lexon funksjonet me posht duke i konvertuar inputet me vlerat fillestare.
    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }
}
