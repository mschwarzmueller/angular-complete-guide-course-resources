import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent {

  // 1. pasi shtypim nje shkrojne brenda input textarea Angulari e perqendron projekti te prind femije: [AppComponent - Messages - NewMessage].
  // 2. nese shfaq te njejtin degezim: [AppComponent - Messages - NewMessage], thjesht Angulari po kontrollon per gabime.

  private messagesService = inject(MessagesService);
  enteredText = signal('');

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  // 3.  kur input textarea ka vlera dhe shtypim submit na shfaqen 3 degezime 
  // [AppComponent - Messages - NewMessage] - -> marim vleren nga NewMessage, e bashkagjisim ne service dhe fshim inputin
  // [AppComponent - Messages - NewMessage - MessagesList] - -> marim vleren te regjistruar ne servis dhe e shfaqim ne komponentin MessagesList
  // [AppComponent - Messages - NewMessage] -> bejme nje kontroll te dyte ne rese dicka ka shkuar keq, si pas regjullit te angularit

  // ** Te gjitha degezimet jan nga PRINDI te FEMIJA ** 
  onSubmit() {
    this.messagesService.addMessage(this.enteredText());
    this.enteredText.set('');
  }
}
