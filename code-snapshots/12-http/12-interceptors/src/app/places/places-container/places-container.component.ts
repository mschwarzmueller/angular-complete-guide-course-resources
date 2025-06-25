import { Component, input } from '@angular/core';

@Component({
  selector: 'app-places-container',
  standalone: true,
  imports: [],
  templateUrl: './places-container.component.html',
  styleUrl: './places-container.component.css'
})
export class PlacesContainerComponent {
   // marim inputin statik nga <app-places-container title="Available Places"> DHE 
   // <app-places-container title="Your Favorite Places">
  title = input.required<string>();
}
