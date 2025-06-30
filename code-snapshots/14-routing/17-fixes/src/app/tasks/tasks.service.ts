import { Injectable, signal } from '@angular/core';

import { type NewTaskData } from './task/task.model'; // pse e quan type, mund ta bej vetem thjesht

@Injectable({ providedIn: 'root' })
export class TasksService {

  private tasks = signal([ // krijojme nje sinjal me array dhe objects
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    { 
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  allTasks = this.tasks.asReadonly(); // get all data 

  constructor() {
    const tasks = localStorage.getItem('tasks'); // marim array object nga localStorage 

    if (tasks) { // nese kemi te dhena 
      this.tasks.set(JSON.parse(tasks)); // i bashkagjisim ne signal tasks
    }
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update((prevTasks) => [
      { // 1. i bashkagjisim oject e reja, task e reja brenda signal task i cili eshte nje array qe mbart object
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks, // 2. e shtojme task e ri, siper tasts te me parshme, ku prevTasks perfaqeson te gjitha tasks e meparshme brenda array singal tasks 
    ]);
    this.saveTasks(); // 3. updetojme dhe array me object ne localStorage
  }

  // updetojme array me object duke fshir nje object me id
  removeTask(id: string) {
    this.tasks.update((prevTasks) => 
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks(); // updetojme localstorage.
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
