import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksComponent } from './tasks.component';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { SharedModule } from '../shared/shared.module';

// Bej export TaskComponet sepse TaskModule e kemi te inportuar ne AppModule ku app-tasks e perdorim ne app.component.html
@NgModule({
  declarations: [
    TasksComponent, 
    TaskComponent, 
    NewTaskComponent
  ],
   exports: [ TasksComponent ],
  imports: [
    CommonModule, // @angular/common perfaqeson DatePipe, e gjeni ne dokumentacjonin Reference/API Reference/common
    FormsModule, // @angular/forms' perfaqeson [(ngModel)], e gjeni ne dokumentacjonin Reference/API Reference/froms/NgModel 
    SharedModule
  ] 
})
export class TasksModule {}  
