import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';
import { PlacesContainerComponent } from './places/places-container/places-container.component';
import { BrowserModule } from '@angular/platform-browser';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING')
  // });
  console.log('[Outgoing Request]');
  console.log(request);
  return next(request).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('[Incoming Response]');
          console.log(event.status);
          console.log(event.body);
        }
      },
    })
  );
}

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlacesContainerComponent,
    AvailablePlacesComponent,
    UserPlacesComponent,
    ModalComponent,
    ErrorModalComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {}
