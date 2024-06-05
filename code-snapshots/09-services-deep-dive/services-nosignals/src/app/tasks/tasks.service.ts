import { Injectable, inject, signal } from '@angular/core';

import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  private tasks: Task[] = [];
  private loggingService = inject(LoggingService);

  get allTasks() {
    // using a getter which returns a copy to make sure the original tasks can't be changed
    return [...this.tasks];
  }

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks = [...this.tasks, newTask];
    this.loggingService.log('ADDED TASK WITH TITLE ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    this.loggingService.log('CHANGE TASK STATUS TO ' + newStatus);
  }
}
