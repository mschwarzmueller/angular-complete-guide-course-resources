import { Component, inject, input } from '@angular/core';
import { ModalComponent } from "../modal.component";
import { ErrorService } from '../../error.service';

@Component({
    selector: 'app-error-modal',
    standalone: true,
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.css',
    imports: [ModalComponent]
})
export class ErrorModalComponent {

  // take data by <app-error-modal title="An error occurred!" [message]="error()" /> in app.component.html
  title = input<string>();
  message = input<string>();
  private errorService = inject(ErrorService);

  onClearError() {
    this.errorService.clearError(); // cleaning message signal
  }
}
 