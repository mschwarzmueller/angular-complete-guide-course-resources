import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  // krijojme nje servis thjesht per te regjistruar nje vler string 
  private _error = signal('');

  // asReadonly na mundeson return or call ne kohe reale te vleres string qe regjistrojme,
  // duke i trasferuar te dhenat ne app.component.ts: private errorService = inject(ErrorService);
  error = this._error.asReadonly(); 

  // 
  showError(message: string) {
    // console.log('showError', message);
    this._error.set(message);
  }

  clearError() {
    this._error.set('');
  }
}
 