import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {

  // ** Shum e rendesishme kjo: 

  // 1. ne angular.json, ne paragrafin "polyfills": [ "zone.js" ], i mundesojme angularit te punoj me librarin zone.js, e cila:
  // menaxhon dhe ndjekjen e ekzekutimit të detyrave asinkrone. Ajo ndihmon Angular-in të kuptojë kur duhet të ekzekutojë ciklin 
  // e detektimit të ndryshimeve për të rifreskuar ndërfaqen e përdoruesit (UI).
  
  // 2. nese e fshim kete libari nga "polyfills" angulari nga ATOMATIK behet MEKANIK ose MANUAL, Atomatik nenkuptoj qe thirjet e cdo funksjoni brenda komponentit, 
  // i ben librari zone.js. Kurse manual, therasim ato komponent qe user eshte duke kerkuar nga User Interface dhe jo ti bej call te gjitha komponenteve njekohesisht,
  // si ben zone.js pa change detection.

  // nese nuk e shtojme kete do na shfaqet ky problem: RuntimeError: NG0908: In this configuration Angular requires Zone.js, ku na thot qe mungon libraria zone.js
  providers: [provideExperimentalZonelessChangeDetection()], // kjo na mundeson djekje manuale te komponeteve, pranda projektit.
}).catch((err) => console.error(err));

// Çfarë duhet të marrësh parasysh:

// 1. Menaxhimi manual i detektimit të ndryshimeve: Pa Zone.js, Angular nuk do të dijë automatikisht se kur të rifreskojë komponentët pasi të ndodhin 
// ngjarje asinkrone (si setTimeout, kërkesat HTTP, etj.). Kështu, duhet të menaxhosh manualisht detektimin e ndryshimeve duke thirrur 
// ApplicationRef.tick() ose duke përdorur ChangeDetectorRef.detectChanges() kur diçka ndryshon.

// 2. Performanca: Kjo qasje mund të ketë një ndikim pozitiv në performancë, pasi Zone.js nuk do të ndjekë më të gjitha operacionet asinkrone.

// 3. Përdorimi i mekanizmave si Signals: Në Angular 16+, mund të përdorësh edhe Angular Signals, që janë një alternativë reaktive më 
// moderne për të menaxhuar ndryshimet e të dhënave në aplikacion.

// Përdorimi i Zoneless Change Detection është një veçori eksperimentale që eliminon nevojën për Zone.js, por kërkon më shumë 
// përgjegjësi nga zhvilluesi për të menaxhuar ciklet e detektimit të ndryshimeve.
