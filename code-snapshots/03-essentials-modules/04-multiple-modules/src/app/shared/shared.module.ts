import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';

// Bejme exports CardComponents sepse SharedModule e kemi te inportuar ne AppModule dhe TasksModule ku:
// app-card e perdorim ne user.component.html dhe tasks.component.html
@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class SharedModule {}
