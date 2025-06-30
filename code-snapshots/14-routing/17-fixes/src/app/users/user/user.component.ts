import { Component, computed, input } from '@angular/core';
import { type User } from './user.model';

// RouterLink na mundeson te njofi routerLink="..." ne templateUrl
// RouterLinkActive na mundeson te njofi routerLinkActive="selected"
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  // marim listen e userss me input nga users.component.html te cilat vin nga dummy-user.ts
  user = input.required<User>();

  // modifikojme path per cdo src image te listes
  imagePath = computed(() => 'users/' + this.user().avatar);
}
 