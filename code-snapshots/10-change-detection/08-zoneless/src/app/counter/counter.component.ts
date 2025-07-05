import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
}) 
export class CounterComponent implements OnInit {
  count = signal(0);
 
  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    setTimeout(() => {
      console.log('Setting count to 0');
      this.count.set(0); // kjo behet zero mbas 4 sekondave
    }, 7000);

    setTimeout(() => {
      
      this.ngZone.run(() => {
        console.log('Timer expired with zone.js!');
      });
    }, 5000);
   }

  // ketu kur shtypim click therasim kompoentet [AppComponent - Counter], sepse ne te gjitha komponentet kemi shtuar kete:
  // changeDetection: ChangeDetectionStrategy.OnPush i cili e perqendron angularin te komponenti qe po shtypim butonin, 
  // nga prindi te femija. Nese nuk e kemi mbivendosur changeDetection brenda @Component({}) angularin do ti bej call te gjith 
  // komponenteve qe nuk kan lidhje me degezimin [AppComponent - Counter].
  // ** changeDetection na mundeson qe projekti te punoj i konstrukturar dhe shum shpejt. ****
  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
 