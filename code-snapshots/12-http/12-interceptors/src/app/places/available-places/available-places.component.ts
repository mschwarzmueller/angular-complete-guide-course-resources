import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';
import { UserPlacesComponent } from '../user-places/user-places.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  // shum e bukur kjo zgjidhja, pra ne vend te varialblave te thjeshta i ka bashkangjitur signal
  places = signal<Place[] | undefined>(undefined); // per te mbajtuar array objecte te places

  isFetching = signal(false); // signal boolean per loading data

  error = signal(''); // signal string 

  private placesService = inject(PlacesService); // marim te dhenat nga servisi 
  private destroyRef = inject(DestroyRef); 

  ngOnInit() {

    this.isFetching.set(true);

    // marim array me objektet dhe e percjelim ne <app-places [places]="places()!" />, te cilat paraqesin te gjitha fotot

    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {// subscribe te dhenave ose body.
      this.places.set(places);
        // console.log('places', places);
      },
      error: (error: Error) => { // regjistrojme ne sinjal errors qe vin nga response i endpoinit ose kur nuk kemi connection me internet
        this.error.set(error.message);
      },
      complete: () => { // complete perfaqeson mbylljen e subscribe, ku i gjith body eshte shfaqur ne browser.
        this.isFetching.set(false);
      },
    });  

    // per dorim on destroy ne cdo endpoint, per ta bllokuar ate, duke mos theritur data, kur komponenti aktual nuk eshte i bashkagjitur ne DOM, ne BROWSER
    // pra DOM, eshte i fiksuar ne kete komponent, therasim endpoint, dhe levizim nga ky komponent ne tjetrin, duke bllokur endpointin qe mos te therasi data
    // e quajne destroy ose shkaterim, sepse kur leviz nga nje komponenti x ne tjetrin y, x shkaterohet, dhe zvendesohet y. 
    this.destroyRef.onDestroy(() => { 
      subscription.unsubscribe();
    });

  }

  // nga array me objekte qe percjellim me lart kur user klikon nje nga ato objekte, marim te dhenat e cdo objekti qe user klikon nga:
  // <app-places (selectPlace)="onSelectPlace($event)" />
  onSelectPlace(selectedPlace: Place) {

    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
        next: (resData) => {
          // response data by  res.status(200).json({ userPlaces: updatedUserPlaces }); inside app.put("/user-places", async (req, res) => {
          console.log('resData by addPlaceToUserPlaces', resData)
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }
}
