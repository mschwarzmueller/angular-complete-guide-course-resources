import { Component } from '@angular/core';

import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
    selector: 'app-tickets',
    standalone: true,
    templateUrl: './tickets.component.html',
    styleUrl: './tickets.component.css',
    imports: [NewTicketComponent, TicketComponent]
})
export class TicketsComponent {

  tickets: Ticket[] = []; // krijojme nje array emtity

  onAdd(ticketData: { title: string; text: string }) { // marim objet data me output nga app-new-ticket
    const ticket: Ticket = {
      title: ticketData.title,
      request: ticketData.text,
      id: Math.random().toString(), 
      status: 'open' 
    }

    this.tickets.push(ticket); // ne e shtojme ne array 
  }

  onCloseTicket(id: string) { // pe cdo clikim mbi object me ndimen e id, updetojme objektin nga status open ne status closed.
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: 'closed' }
      }
      return ticket;
    });
  } 
}
