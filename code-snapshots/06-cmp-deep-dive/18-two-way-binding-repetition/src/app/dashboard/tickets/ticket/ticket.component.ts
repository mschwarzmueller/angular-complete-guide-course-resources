import { Component, Input, Output, input, output, signal } from '@angular/core';

import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  // @Input({}) ...
  data = input.required<Ticket>(); // marim te dhenat nga tickets.component.html 

  // @Output('closeTicket')
  close = output<void>(); // krijojme nje output void i cili do prejcelli metem sinjalin ne tickets.component.html 

  detailsVisible = signal(false); // krijojme nje signal boolean me vler fillestare false 

  onToggleDetails() { 

    // per cdo shtypje te butonit signal boolean false e kthejme ne true, dhe nga true ne false
    // if true kodi lexon:  @if (detailsVisible()) { , if false kodi lexon:  } @else {

    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((wasVisible) => !wasVisible); 
  }

  onMarkAsCompleted() {
    this.close.emit();
  }
}
  