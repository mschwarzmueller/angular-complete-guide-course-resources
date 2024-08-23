import { Component, Input, Output, EventEmitter } from '@angular/core';

import { type User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [CardComponent]
})
export class UserComponent {

  // required: true esht enje feature e re e @Input e cila e palajmeron inputin qe <app-user [user]="user" /> mungon 
  @Input({ required: true }) user!: User; // cdo vler eshte undifiend or '!' sepse nuk kemi vlera, kur kodi behet run mbushet me flera
  @Input({required: true}) selected!: boolean;
  @Output() select = new EventEmitter<string>(); // user_is_string qe marim nga this.select.emit e bashkagjisim ne (select)="onSelectUser($event)"

  // getter methond enabling dynamic values in your template
  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
 