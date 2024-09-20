import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task,NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Input({required:true}) userId!: string;
  @Output() close = new EventEmitter<void>();
  private tasksService = inject(TasksService);

  enteredTitle='';
  enteredSummary='';
  enteredDate='';

  onSubmitTask(){
    this.tasksService.createTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate
    },this.userId);
    
    this.close.emit();
  }

  onCancelTaskCreation(){
    this.close.emit();
  }
}
