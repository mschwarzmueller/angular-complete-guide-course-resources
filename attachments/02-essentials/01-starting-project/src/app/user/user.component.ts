import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input({required:true}) user!:User;
  @Input({required:true}) iAmSelected!: boolean;
  @Output() selected=new EventEmitter<string>();

  
  onSelectedUser(){
    this.selected.emit(this.user.id);
  }

  get imagePath(){
    return `../assets/users/${this.user.avatar}`;
  }
}
