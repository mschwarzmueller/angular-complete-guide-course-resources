import { Component, computed, inject } from '@angular/core';

import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {

  private investmentService = inject(InvestmentService); // therasim servisin me inject 

  // Computed signal are read-only signals that derive their value from other signals. pra na mundeson te marim vlerat nga resultData_signal
  results = computed(() => this.investmentService.resultData()); 
}
  