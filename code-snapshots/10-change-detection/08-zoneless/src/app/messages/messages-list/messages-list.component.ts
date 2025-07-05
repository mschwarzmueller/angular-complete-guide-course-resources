import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {

  private messagesService = inject(MessagesService); // marim servisin 
  messages = this.messagesService.allMessages; // marim array string me vlera 

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
