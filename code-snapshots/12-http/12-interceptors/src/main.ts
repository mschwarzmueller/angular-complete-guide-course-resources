
// *** Duke qen se nuk kemi '@NgModule' ku te bashkagjisim librarit te cilat nga mundesojne lidhjen me backend,
// dhe frontend nga 'platformBrowserDynamic().bootstrapModule(AppModule)', krijojme nje Interceptor - Vezhguhes,
// i cila lecon request dhe response midis front - back, me kete kuptojme nderthurjen front - back, LIDHJEN. ***

import { bootstrapApplication } from '@angular/platform-browser';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { tap } from 'rxjs';

// Interceptors are generally functions which you can run for each request, 
// and have broad capabilities to affect the contents and overall flow of 
// requests and responses. You can install multiple interceptors, which form 
// an interceptor chain where each interceptor processes the request or response 
// before forwarding it to the next interceptor in the chain.

function loggingInterceptor( // nje interceptor per te kaput response te cdo endpointi ne projekt.
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {

  // An interceptor may transform the Observable stream of HttpEvents returned by next in 
  // order to access or manipulate the response. Because this stream includes all response 
  // events, inspecting the .type of each event may be necessary in order to identify the 
  // final response object.
  
  return next(request).pipe(
    tap({
      next: event => {
       
        if (event.type === HttpEventType.Response) {
          console.log('event.status when response',event.status);
          console.log('event.body when response',event.body);
         }

      }
    })
  );
}

// You declare the set of interceptors to use when configuring HttpClient through dependency injection, 
// by using the withInterceptors feature:

// withInterceptors([]) -> na mundeson te shtojme cfare dolloj interceptori 

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));

// The interceptors you configure are chained together in the order that you've listed them in the providers. 
// In the above example, the loggingInterceptor would process the request

// *** nese do lidheshim me @NgModule do ishte keshtu: 

// 'platformBrowserDynamic().bootstrapModule(AppModule)',

// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { provideHttpClient } from '@angular/common/http';
 
// @NgModule({
//   declarations: [
//     AppComponent,
//     PlacesComponent,
//     // ... etc
//   ],
//   imports: [BrowserModule, FormsModule],
//   providers: [provideHttpClient()], -> kjo na mundeson njofjen e Service HttpClient i cili mundeson request dhe response.
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

// ---------------------------------- ***
