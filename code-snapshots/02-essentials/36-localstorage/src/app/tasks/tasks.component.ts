import { Component, Input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent],
})
export class TasksComponent {
  // marim vlerat userId dhe name nga app-root
  // ketu marim userId i cili burron nga njera nga listat qe user ka shtypur
  @Input({ required: true }) userId!: string; 
  @Input({ required: true }) name!: string;
  isAddingTask = false;

  // private tasksService = inject(TasksService);
  constructor(private tasksService: TasksService) {} // si inject si constructor funksjoni eshte i njejte

  // marim ato objekte nga tasks_array te cilat filtrohen nga user_id, te cilat i bashkagjisim ne app-task
  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
} 
