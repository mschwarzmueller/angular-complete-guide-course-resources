import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ServerStatusComponent } from './dashboard/server-status/server-status.component';
import { TrafficComponent } from './dashboard/traffic/traffic.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent, // komponenti header eshte standalone: true, mjafton vetem ta inportosh, por edhe nese do kishim @NgModule dhe komponenti do ishte standalone: true, thjesht na duhesh ta inportonim.
    ServerStatusComponent,
    TrafficComponent,
    TicketsComponent,
    DashboardItemComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
 