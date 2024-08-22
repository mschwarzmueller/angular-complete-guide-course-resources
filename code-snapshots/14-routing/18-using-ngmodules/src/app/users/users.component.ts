import { Component, inject } from '@angular/core';

import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users;
}
