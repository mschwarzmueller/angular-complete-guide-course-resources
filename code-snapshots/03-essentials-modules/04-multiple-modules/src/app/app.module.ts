import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({ // Inportojme komponentet dhe @NGMODULE qe na duhet, te cilat i shofim lehtesisht nga app.component.html  
  declarations: [
    AppComponent, 
    HeaderComponent, 
    UserComponent
  ],
  imports: [
    BrowserModule,
    //  ** app-card nuk e shofim ne app.component.html, por app-card ben pjes brenda UserComponet qe ne e kemi importuar te deklarimet, 
    //  prandaj e shtojme dy here, ketu ne app.module.ts dhe tasks.module.ts **
    SharedModule, 
    TasksModule,
],
bootstrap: [AppComponent], // brenda boostrap caktojme komponentin prinde AppComponent, nga i cili nderthuren te gjith komponentet femije, 
// prandaj shtojme boostrap duke i themi Angularit, kur kodi behet run, ta filloj leximin e kodit nga komponenti prinde AppComponent.  
}) 
export class AppModule {}
  