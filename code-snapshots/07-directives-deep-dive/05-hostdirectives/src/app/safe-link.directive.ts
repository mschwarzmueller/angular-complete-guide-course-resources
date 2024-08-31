import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

// The @Directive is used to create a custom attribute directive in Angular. In your case, 
// the SafeLinkDirective is applied as an attribute to an HTML element, specifically an 
// anchor (<a>) element.

@Directive({ // Directive perfaqeson ->  <a href="https://angular.dev" appSafeLink="myapp-docs-link">Angular Documentation</a>
  selector: 'a[appSafeLink]',
  standalone: true,
  host: { // pra host ne vetvete perfaqeson Directive ne teresi qe eshte <a /> dhe kur e shtypim ate na drejton te funksjoni: onConfirmLeavePage(event: MouseEvent)
    '(click)': 'onConfirmLeavePage($event)' // click perfaqeson -> href="https://angular.dev"
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {

  queryParam = input('myapp', { alias: 'appSafeLink' }); // marim string nga appSafeLink="myapp-docs-link" ose appSafeLink="myapp-courses-link" kur e shtypim link

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() { 
    console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {

    const wantsToLeave = window.confirm('Do you want to leave the app?'); // na paraqet nje djalog per te ndryshuar faqe i cili eshte nje boolean

    if (wantsToLeave) { // nese shtypim butonin ok - true, kodi lexon funksjonet ku jemi duke modifikuar href e <a />
      const address = this.hostElementRef.nativeElement.href; // kjo perfaqeson href e <a/>

      // kurse this.queryParam() perfaqeson -> myapp-docs-link ose myapp-courses-link
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam(); 

      // dhe return https://angular.dev/?from=myapp-docs-link ose https://academind.com/courses?from=myapp-courses-link
      return;
    }

    event.preventDefault(); // if flase - cancle qendrojme ne faqen qe jemi.
  }
}
 