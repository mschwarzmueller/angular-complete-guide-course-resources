import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewEncapsulation,
  afterNextRender,
  afterRender,
  contentChild,
  inject,
  input,
} from '@angular/core';

// The encapsulation property in the @Component decorator controls how styles are applied and isolated in 
// Angular components. Here's a quick overview of the options:

// ViewEncapsulation.Emulated (default): Styles are scoped to the component using a mechanism similar to 
// Shadow DOM but without actually using it. Angular adds unique attributes to elements to prevent styles 
// from leaking out or in.

// ViewEncapsulation.None: No encapsulation is applied. This means styles defined in the component will 
// affect the entire application, and global styles will also affect the component.

// ViewEncapsulation.ShadowDom: Uses the browser's native Shadow DOM to encapsulate styles. Styles are 
// truly isolated, meaning they don't leak out, nor do global styles affect the component.

@Component({
  selector: 'app-control',
  standalone: true,  
  imports: [],
  templateUrl: './control.component.html', 
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, // This means that the styles in control.component.css are global—they can affect elements outside the 
  // ControlComponent, and external styles can affect elements within this component.
  host: { // kurse host ne vetvete perfaqeson gjith komponentin ControlComponent.
    class: 'control', // This automatically adds the class control to the host element of the ControlComponent. So whenever you use <app-control>, the resulting HTML element will have the class control.
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('Clicked!');
  // }

  label = input.required<string>(); // marim titullin e input ose textarea nga <app-control label="Title"> dhe e bashkangjisim ne html: <label>{{ label() }}</label>

  private el = inject(ElementRef);

  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  // pra si required, inject, contentChild bejne pjese te familja signal, ne kete raste contenChild dhe @ContentChild jan te njeta
  // ato marim vleren e #input nga:
  // <app-control label="Title">
  //   <input name="title" id="title" #input [(ngModel)]="enteredTitle" />
  // </app-control>

  // ** ku ndryshimi mi dis @ContentChild dhe @ViewChild eshte se @ContentChild  i mer vlerat nga <app-control> ketu <app-control />,
  // ndersa @ViewChild nga html e komponentit ***

  constructor() { 
    // afterRender(() => {
    //   console.log('afterRender');
    // });
 
    // afterNextRender(() => {
    //   console.log('afterNextRender');
    // });
  }

  ngAfterContentInit() { // e perdorim ketu sepse <app-control> e kemi te perdorim ne komponente te tjere
    console.log( 'after content init',this.control());
  }

  onClick() {
    console.log(this.el);
    console.log('Clicked input contentChild', this.control());
  }
}
