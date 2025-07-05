import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({ 
  selector: '[appAuth]',// perfaqeson *appAuth="'admin'" - *appAuth="'user'" - *appAuth="'guest'"
  standalone: true
})
export class AuthDirective {

  // input mer vlerat nga: *appAuth="'admin'" - *appAuth="'user'" - *appAuth="'guest'" ne app.component.html
  userType = input.required<Permission>({ alias: 'appAuth' });

  private authService = inject(AuthService);

  // perfaqeson <ng-template /> ne html ku i jep akses DOM te mos i shfaq ne browser: <p /> *appAuth="'admin'" - *appAuth="'user'" - *appAuth="'guest'"
  private templateRef = inject(TemplateRef); 

  // i jep akses TemplateRef ose <ng-template /> nga DOM te shfaq nje nga tre kushtet: <p /> *appAuth="'admin'" - *appAuth="'user'" - *appAuth="'guest'"
  private viewContainerRef = inject(ViewContainerRef); 

  constructor() {
    // The effect function to reactively update the view whenever the user's role changes.
    effect(() => { 

      // - TemplateRef is a reference to a chunk of template code that can be instantiated but is 
      // not yet attached to the DOM.

      // - ViewContainerRef is a container that allows you to dynamically insert or remove views 
      // created from TemplateRef into the DOM.

      // - Internally, Angular uses these objects to efficiently manage dynamic content, ensuring 
      // that only the necessary parts of the DOM are updated and rendered based on the application state.

      if (this.authService.activePermission() === this.userType()) {

        // Angular manages the change detection and lifecycle of this view.
        this.viewContainerRef.createEmbeddedView(this.templateRef); // viewContainerRef i jep akese DOM te shfaqi TemplateRef ose <ng-template /> ku do qofte ai
        
      } else {
        // Removes all views that were added to the ViewContainerRef, cleaning up the DOM and 
        // removing the corresponding elements.
        this.viewContainerRef.clear();// dhe kjo ketu fshim cdo lloj aksesi qe vlerat brena tre kushteve te behen false, mos te shfaqen.
      }
    });
  }
}
