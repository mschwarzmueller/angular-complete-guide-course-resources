import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';

// withComponentInputBinding() -> perdoret per te regjistruar te dhena ne url ose routes, 
// brenda data dhe resolve, te cilat i thersim me input te komponenti lokal qe i kemi 
// bashkagjitur keto features.

// withRouterConfig({ paramsInheritanceStrategy: 'always' }) -> perdoret per ti dhen 
// askses femis se nje routes te mari me input vlerat e prindit, pra: data, resolve
// userId qe ndodhet ne url, njesoj sic e mernim dikur nga activatedRoute me paramMap.

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, // Konfigurimi i rrugëve të cilat janë importuar
      withComponentInputBinding(), 
      withRouterConfig({
        paramsInheritanceStrategy: 'always', 
      })
    ),
  ],
}; 
 