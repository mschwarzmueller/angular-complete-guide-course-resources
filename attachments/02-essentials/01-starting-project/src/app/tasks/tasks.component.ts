import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskData, Task } from './task/task.model';
import{AddTaskComponent} from './add-task/add-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent,AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

   @Input({required:true}) userId!: string;
   @Input({required:true}) name!: string ;
   addATask = false;
  
  constructor(private tasksService:TasksService) {
  }

  handleCompleteTask() {}

  get tasksByUser() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask(){
    this.addATask = true;
  }

  handleClosedTaskCreation() {
    this.addATask =false;
  }

}
