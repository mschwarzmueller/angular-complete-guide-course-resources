import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

// bootstrapApplication(AppComponent, {
//   providers: [{ provide: TasksServiceToken, useClass: TasksService }],
// }).catch((err) => console.error(err));
// bootstrapApplication(AppComponent).catch(
//   (err) => console.error(err)
// );
