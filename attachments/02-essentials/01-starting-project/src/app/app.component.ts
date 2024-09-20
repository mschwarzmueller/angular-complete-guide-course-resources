import { Component, EventEmitter } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent,TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  users=DUMMY_USERS;
  selectedUserId?:string;
  
  get SelectedUser(){
    return this.users.find((user)=>user.id===this.selectedUserId)!;
  }

  handleSelectedUser(userId: string) {
    console.log('Selected user ID:', userId);
    this.selectedUserId=userId;
  }
  
}
