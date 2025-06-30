import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// **** NOTE: i dea e platformBrowserDynamic().bootstrapModule(AppModule) eshte qe Angulari kur behet run e lexon kodin duke filluar ne AppModule, 
// AppModule permban prindin e komponetve AppComponent nga i cili nderthuren te gjith komponentet femije te projektit, prandaj e shtojme brenda,
// declarations[AppComponent] dhe bootstrap[AppComponent], ku boostrap i thot Angularit ta filloj leximin e kodit nga componenti Prind qe caktojme,
// edhe pse e kemi te declaruar, e bashkangjisim brenda bootstrap[AppComponent] persire, sepse ne brenda deklarimit do shtojme komponent femije te 
// tjere dhe Angulari nuk ka si ta kuptoj se kusht eshte komponenti Prind, prandaj shtojme bootstrap[AppComponent] *********

// **** NOTE: ndersa ideja e bootstrapApplication(AppComponent).catch((err) => console.error(err)); esthe me e thjeshte, duke qen se te gith
// komponentet jan te pavarur: ' standalone: true ', e specifikojme AppComponent si prindi i gjith komponenteve te angularit nga 
// bootstrapApplication(AppComponent), ku Angularin kur behet run fillon dhe lexon kodin nga komponenti prinde AppComponet nga te cilet jan te 
// nderthuar te gjith komponentet femije. *****

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err)); // This is the traditional approach to bootstrapping an 
// Angular application and has been the standard method in Angular versions prior to Angular 14.
// How It Works:
// - Module-Based Bootstrapping: Angular applications are traditionally structured around modules, with AppModule being the root module.
// - Bootstrapping: The platformBrowserDynamic() function creates a platform that is suitable for running in a browser and then bootstraps 
//   the AppModule by calling bootstrapModule(AppModule).
// - Configuration in AppModule: The AppModule defines the root AppComponent that is bootstrapped along with any global configurations like 
//   services, routes, and other module imports.

// bootstrapApplication(AppComponent).catch((err) => console.error(err)); This is the new approach introduced in Angular 14, which allows you 
// to bootstrap an Angular application without requiring an NgModule. This method provides a more lightweight and flexible way to bootstrap an 
// Angular application.
// How It Works:
// - Component-Based Bootstrapping: Instead of bootstrapping the application through a module (AppModule), you directly bootstrap the root component (AppComponent).
// - Simplified API: The bootstrapApplication function simplifies the bootstrapping process by focusing directly on the root component, making the setup process more straightforward.
// - Optional Modules: You can still use modules if needed, but they are not required for bootstrapping.

// Direct Component Bootstrap: This method eliminates the need for a root AppModule, directly focusing on the root component.
// Better for Smaller Applications: This approach is particularly useful for small applications or scenarios where the complexity of an AppModule is unnecessary.

// Module vs. Component: The traditional approach bootstraps the application via a root module (AppModule), while the new approach bootstraps directly via the root component (AppComponent).
// Complexity: The platformBrowserDynamic().bootstrapModule(AppModule) method is more suited for larger applications with complex dependencies and configurations, 
// while bootstrapApplication(AppComponent) simplifies the bootstrapping process and is ideal for smaller or simpler applications.

