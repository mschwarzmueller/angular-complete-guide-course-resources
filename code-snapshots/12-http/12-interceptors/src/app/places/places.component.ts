import { Component, input, output } from '@angular/core';

import { Place } from './place.model';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {

  // dergojme dhe marim vlera nga available-places.component.html

  places = input.required<Place[]>(); // vaim vlerat me input nga [places]="places()!" 
  selectPlace = output<Place>();

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place); // dergojme objektet me ndimen e output ketu: (selectPlace)="onSelectPlace($event)"
  }
}
