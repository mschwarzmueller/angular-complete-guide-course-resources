import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// appCofig na mundeson kofigurimet e app.routes.ts.

// ne angular 17 app.routes.ts e mundesonim ne @Ngmodule, por angular 18, nuk ka @NgModule, ku ne te deklarojme 
// komponentet, routes, librarit, ka vetem nje kjoponentet prinde AppComponent ku ne deklarojme nga larte posht,
// komponentet feme, ku librarit i importojme brennda komponenteve, e cila ngjason me rrenjet e nje peme. 

// angulari si strukture ne vetve perfaqeson nje faqe, -> 'index.html', ku funksjoni routes na mundeson,
// brenda kesaj faqe te lundrojme ne disa faqe te tjera.

// ne rastin ton ne kofigurruam komponentin prind AppComponent dhe app.routes.ts te lundrojme ne disa faqa. 
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
 