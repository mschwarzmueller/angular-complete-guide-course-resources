import { Component } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [WelcomeComponent],
})
export class AppComponent {}
