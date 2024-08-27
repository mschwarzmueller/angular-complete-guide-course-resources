import { Injectable, signal } from '@angular/core';

import type { InvestmentInput } from './investment-input.model';

// ishte @Injectable({ providedIn: 'root' })
@Injectable() // E BEM KESHTU SEPSE DONIM TA BASHKAGJISNIM SERVISIN NE providers: [InvestmentService] TE UserInputModule.
export class InvestmentService {

  resultData = signal<{ // krijojme nje signal per te mbajtur te dhena, nje soj si subject
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[] | undefined>(undefined); // 7. pasi resultData_array mbushet me 10 object, kodi rikthehet ne user-input.component.ts 

  calculateInvestmentResults(data: InvestmentInput) { // 2. mari te dhenat nga user-input.component.ts dhe i kalkulojme
    
    const { initialInvestment, annualInvestment, expectedReturn, duration } = data; // marim vlerat nje nga nje

    const annualData = [];

    let investmentValue = initialInvestment; 

    for (let i = 0; i < duration; i++) { // 3. duration = 10,

      const year = i + 1;

      const interestEarnedInYear = investmentValue * (expectedReturn / 100);

      investmentValue += interestEarnedInYear + annualInvestment;

      const totalInterest = investmentValue - annualInvestment * year - initialInvestment;

      annualData.push({ // 4. mbushim annualData array me 10 object body 
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });

    } // 5. kur i = 10 nuk eshte me vogel se duration = 10, kshtu qe for loop ndalon se kalkuluari te dhena 

    this.resultData.set(annualData); // 6. bashkagjisim annualData_array me 10 objekte ne signal
  }
}
