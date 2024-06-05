import { Component } from '@angular/core';

import { TasksComponent } from './tasks/tasks.component';
// import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TasksComponent],
  // providers: [LoggingService]
})
export class AppComponent {
}
