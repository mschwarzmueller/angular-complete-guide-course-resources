import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {

  isFetching = signal(false); // boolean signal per loading data 
  error = signal(''); // string signal 

  private placesService = inject(PlacesService); // inject serivice PlacesService

  private destroyRef = inject(DestroyRef); // inject DestroyRef methot for cleaning endpoint if finishd with it 

  // ** ky eshte nje array i ndryshushem, i cili do ndryshoj me menyre asinkrone, ne se e bejme subcribe nest 
  // ne kete komponente, do na percilet nje bug, do vem re qe kur shtojme nje objekt, objekti nuk percilent ne kohe 
  // reale ne array user-place por vetem kur i bejme update apllication, athere na duhet te gjejme nje menyre ku ta 
  // therasim funksjonin 'this.getUserPlaces();' brenda funskjonit  onSelectPlace() brenda next sepse duhet response 200 
  // dhe brenda funksjonit 'onRemovePlace()' edhe ketu brenda subscribe sepse duhet response 200, por Maksimiljani ka 
  // gjetur kete menyren me te bukur **
  places = this.placesService.loadedUserPlaces;  // take data by loadedUserPlaces = this.userPlaces.asReadonly(); 

  ngOnInit() { 
   this.getUserPlaces();
  }

  getUserPlaces() {

    this.isFetching.set(true);

    // marim vlerat nga array user-places.js qe updetojme me te dhena kur shtypim nje foto, ose kur e fshim ate 
    const subscription = this.placesService.loadUserPlaces().subscribe({

      // *** ketu kam nje pyetje, pse nuk shfaqet vlerat sa here qe shtojme nje foto a objekt ne array user-places.json ??? ***
      // *** Sepse duhe te gjejme nje menyer ti bejme call this.getUserPlaces(); branda subscribe nest te:
      // this.placesService.removeUserPlace(place).subscribe(); dhe:
      // this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe 

      // next: (userPlaces) => console.log('userPlaces test', userPlaces),

      // *** SHUM E RENDEISHME: MAKSIMILJANI KA BER NJE GJE TE BUKUR KETU: ***
      // ne kete endpoint nuk e ka shtuar 'next' nga i cili marim te dhena, por e ka shtuar brenda pipe() ne loadUserPlaces() {}
      // *** PSE E KA BER KETE ??? Sepse e updeton sinjalin: private userPlaces = signal<Place[]>([]); ne kohe reale nga service places.service.ts *** 
      // per te  mar te dhena, per te shtuan dhe te fshir, do thoni ju pse e ka ber subscribe kur nuk shfaqim te dhena
      // nese nuk i bej subscribe nuk kemi si ta therasim endpointin, te shfaqim error ne console ne se kete, 
      // dhe ta mbyllim endpointin nga onDestroy kur nuk duam te therasim me te dhena.

      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => { // complete, do te thot, kur nuk kemi me vlera per te mar, ne kete reste mbyllim loading 
        this.isFetching.set(false); // mbyllim loading 
      },
    });

    this.destroyRef.onDestroy(() => { // mbyllim endpointing 
      subscription.unsubscribe();
    });

  }

  onRemovePlace(place: Place) {

    const subscription = this.placesService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
