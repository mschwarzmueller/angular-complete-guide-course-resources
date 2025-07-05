import { Component } from '@angular/core';

import { LoginComponent } from './auth/login-reactive/login.component';
import { SignupComponent } from "./auth/signup-reactive/signup.component";
import { LoginDriverComponent } from './auth/login-driver/login-driver.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [LoginComponent, SignupComponent, LoginDriverComponent]
})
export class AppComponent {}
