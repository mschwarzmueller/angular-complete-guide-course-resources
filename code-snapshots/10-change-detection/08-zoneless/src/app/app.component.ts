import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CounterComponent } from './counter/counter.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CounterComponent, MessagesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // ** Shum i rendesishem ne projekte, e ndimon Angularin te perqendrohet te komponentet qe funksjoni theritet, nga User Interface. **
})
export class AppComponent {

 // ** Nese nuk e kemi mbivendosur changeDetection brenda @Component({}) angularin do ti bej call te gjith komponenteve. ** 

  get debugOutput() {
    console.log('[AppComponent] "debugOutput" binding re-evaluated.');
    return 'AppComponent Component Debug Output';
  }

  // kur i bejme refresh application na commentohen: 
  // 1. [AppComponent - Counter - InfoMessages - Messages - NewMessage - MessagesList] - 
  // po te vem re qe komponentet theritet si pas renditjes se vendosjes ne html sepse Change Detection ose zbulimi i ndryshimit, funksjonon nga PRINDI te FEMIJA.

  // 2. Ta zem se shtypim komponentin InfoMessages, change detection brenda Angularit do ta fokusoj projektin te komponenti InfoMessages duke i ber call vetem ketyre komponenteve:
  // [AppComponent - Counter - InfoMessages]

  // 3. pasi shtypim nje shkrojne brenda input textarea Angulari e perqendron projekti te prind femije: [AppComponent - Messages - NewMessage].
  // nese shfaq te njejtin degezim: [AppComponent - Messages - NewMessage], thjesht Angulari po kontrollon per gabime.
  
  // 4.  kur input textarea ka vlera dhe shtypim submit na shfaqen 3 degezime 
  // [AppComponent - Messages - NewMessage] - -> marim vleren nga NewMessage, e bashkagjisim ne service dhe fshim inputin
  // [AppComponent - Messages - NewMessage - MessagesList] - -> marim vleren te regjistruar ne servis dhe e shfaqim ne komponentin MessagesList
  // [AppComponent - Messages - NewMessage] -> bejme nje kontroll te dyte ne rese dicka ka shkuar keq, si pas regjullit te angularit

  // ** Te gjitha degezimet jan nga PRINDI te FEMIJA **
}
