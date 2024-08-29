import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket', 
  standalone: true,
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  imports: [ButtonComponent, ControlComponent, FormsModule],
})
export class NewTicketComponent implements OnInit, AfterViewInit {

  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  @ViewChild('input') private input?: ElementRef<HTMLInputElement>;
  @ViewChild('textarea') private textarea?: ElementRef<HTMLTextAreaElement>;

  enteredTitle = '';
  enteredText = '';  

  // @Output() add = new EventEmitter<{title: string; text: string}>();
  add = output<{ title: string; text: string }>();

  ngOnInit() {
    console.log('ONINIT --> this.form?.nativeElement', this.form?.nativeElement);
  }

  ngAfterViewInit() {
    console.log( 'AFTER VIEW INIT --> this.form?.nativeElement', this.form?.nativeElement);
    
    if (this.input) { // marim vlera nga input title 
      console.log('Title input value:', this.input.nativeElement.value);
    }

    if (this.textarea) { // marim vlerat nga textaare request 
      console.log('Request textarea value:', this.textarea.nativeElement.value);
    }
  }

  onSubmit() {
    if (this.form?.nativeElement.checkValidity()) {
      this.add.emit({ title: this.enteredTitle, text: this.enteredText });
      this.resetForm();
    } else {
      console.log('Form is not valid');
    }
  }

  private resetForm() {
    this.enteredTitle = '';
    this.enteredText = '';
    this.form?.nativeElement.reset(); // Reset the form programmatically
  }
}
 