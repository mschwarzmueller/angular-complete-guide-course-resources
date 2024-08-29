import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  // krijojme ne string signal me 3 kushte ku gjendja e tij fillestare eshte 'offline'
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline'); // signal eshte i ngjashem si subjet ne librarin rxjs 

  // pra therasim nje funkson si cili theret funksonet brenda ketit komponentet edhe kur angulari eshte i fokusuar ne 
  // komponentet te tjere, pershembull jemi te komponenti app-tickets duke krijuar nje ticket, DestroyRef te ky komponent
  // vazhdon i mundeson angularit te therasi funksonet brenda komponetit ServerStatusComponent edhe pa qen user 
  // prezen ne te.

  private destroyRef = inject(DestroyRef); 
  // What "Destroyed" Means:
  // For example, if your component is used in a certain route, and the user navigates to another route, Angular will destroy 
  // the component. This means your interval will be cleared, thanks to the clearInterval call inside onDestroy. Without this, 
  // the interval would continue running even though the component is no longer visible, potentially causing memory leaks or 
  // unwanted behavior.

  constructor() {
    effect(() => {
      // console.log(this.currentStatus()); 
    });
  } 

  ngOnInit() {

    const interval = setInterval(() => { // funksoni e lejon kodin te lexoj mbas 5 sekondash 

      const rnd = Math.random(); // 0 - 0.99999999999999

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => { // therasim funksjonin ne pafundesi cdo 5 sekonda te cilat permbajne vlera random, pasi mbaron ciklin
      clearInterval(interval);
    });
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }

  // ngOnDestroy() {
  //   clearTimeout(this.interval);
  // }
}
