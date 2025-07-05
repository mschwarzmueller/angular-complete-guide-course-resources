import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string; // marim user id nga app-tasks
  // eshte void sepse nuk po percjell te dhena, thjesht po percjellim sinjalin
  @Output() close = new EventEmitter<void>(); // sinjalizojme (close)="onCloseAddTask()" ne app-tasks duke mbullur dialogun

  // specifikoj ca vlera boshe
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // constructor(private tasksService: TasksService) {}
  private tasksService = inject(TasksService); // si inject si constructor funksjoni eshte i njejte

  onCancel() {
    this.close.emit();
  }

  onSubmit() { 
    this.tasksService.addTask( // krijojme vlera te reja duke mbyllur dialog
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    this.close.emit();
  }
}
