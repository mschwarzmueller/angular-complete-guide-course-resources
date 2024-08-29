import { Component } from '@angular/core';

// Komponentin button e perdorim ne dy vende, ne header komponent dhe ne new-ticket komponent, 
// app-button-in-header dhe app-Button-in-new-ticket jane celsat qe i diferencon nga njeri tjetri 

@Component({
  selector: 'button[app-button-in-header], button[app-Button-in-new-ticket]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {}

   