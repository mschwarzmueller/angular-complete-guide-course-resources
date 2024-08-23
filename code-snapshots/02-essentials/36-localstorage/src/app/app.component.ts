import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from "./tasks/tasks.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent, UserComponent, TasksComponent]
})
export class AppComponent {
  users = DUMMY_USERS; // marim vlerat fallso 
  selectedUserId!: string; // eshte undifiend sepse vlera ne fillim eshte bosh

  // nga komponenti app-user marim me output user_id_string, pasi user shtype nje nga pikat ne list
  onSelectUser(id: string) {  
    this.selectedUserId = id;
  }

  // nga user_id_string qe morem gjejme objektin ne user_array_dommy
  // pasi gjejme objektin nga user_is_string me ndimen keyword 'get' e katapultojme ne html inside app-tasks
  // por deri ne momentin qe code nuk eshte run, i gjith funksjoni me foshtem eshte UNDIFIEND
  // qe do te thot, nuk mundemi ta bashkagjisim ne html pa ndimen e keyword '!'  
  // ose si pas llogikes se re @if(selectedUser)
  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  
}
