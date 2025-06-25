import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './place.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {

  // marim servisin Error te cilin ne brendesi te tij kemi nje sinjal string 
  private errorService = inject(ErrorService);

  // Marim me inject librarin qe HttpClient i cili na lidh me backend
  private httpClient = inject(HttpClient); 


  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    // nga ky endpoint marim vlera statike te cilat jan ne file places.json
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    // nga ky endpoint marim vlera te cilat updetohen vazhdimisht jan ne file places.json
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places. Please try again later.'
    ).pipe(
      tap({ // edhe pa i ber subscribe endpoitit, ne e updetojme nga ketu array user-places.
        next: (userPlaces) => this.userPlaces.set(userPlaces), 
      })
    ); 
  }

  private fetchPlaces(url: string, errorMessage: string) {

   // meqe data body vjen { places: [{},{},...,{}] }, ** pershtasim formen e get<{ places: Place[] }> sic na vjen nga backend per ta modifikuar body **
    return this.httpClient.get<{ places: Place[] }>(url).pipe( 
      map((resData) => resData.places), // **return body, duke modifikojme body like this: [{},{},...,{}] **
      catchError((error) => { // ** return nese response body ka errors **
        // ** return string error, si pas deshires ton: 'Something went wrong fetching the available places. Please try again later.' **
        // ** ku string error e percjellim ne subscribe error: (error: Error) => { this.error.set(error.message); }
        return throwError(() => new Error(errorMessage)); // per ta shfaqur messazh string error ne browser.
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {

    const prevPlaces = this.userPlaces();// marim vlerat ne kohere reale nga signali array Place[], ndryshe qyhet lexom vlerash

    // console.log('prevPlaces 1', prevPlaces);

    // nese nuk ekzsiston objekt id e fotos qe shypim, nuk e shtoj dot ne signal Array
    // e bejme kete kusht ketu per te mos shtuar objekte te njeta 
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]); 
    }

    // shtojme objektin ne array file user-places.json
    return this.httpClient
      .put('http://localhost:3000/user-places', { 
        placeId: place.id, 
      })
      .pipe(
        catchError((error) => { // kapim cdo error 
         
          // ** nese kemi nje error ne shtimin e nje obejkti, edhe pse e shypim butonin add percjellim vetem ato te dhena qe kishim nga:
          // 'const prevPlaces = this.userPlaces();' -> shum e bukur si llogjik ** 
          this.userPlaces.set(prevPlaces); 

          // mbushim sinjalin string me vlera: private _error = signal('');
          this.errorService.showError('Failed to store selected place.');

          // throwError na mundeson ta shfaqim string 'Failed to store selected place.' ne console
          return throwError(() => new Error('Failed to store selected place.'));
        })
      );
  }

  removeUserPlace(place: Place) {

    const prevPlaces = this.userPlaces();

    // if ekziston id 
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id)); // fshim objektin nga signal array Place[]
    }

    // fshim objekt edhe nga array ne file user-places.json
    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to remove the selected place.');
          return throwError(() => new Error('Failed to remove the selected place.'));
        })
      );
  }

}
