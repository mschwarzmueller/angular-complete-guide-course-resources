import { Injectable } from '@angular/core';

import { type NewTaskData } from './task/task.model';

// Type Alias: The type keyword allows you to create a type alias for complex types, making your code 
// more readable and easier to manage.

// Union Types: You can use type to define a union of multiple types.

// type: Used for creating type aliases, can define unions, intersections, and more complex types.
// interface: Used to define object shapes, especially for objects and classes, and supports declaration merging.

// The type keyword in TypeScript (and Angular 18) is used to define custom types, which can be 
// imported and used across your application. It allows for better code organization, type safety, 
// and readability. You can create complex, union, or intersection types with the type keyword.

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = [
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
  ];

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      // veretet ne kemi nje tasks_array me 3 objekte por this.tasks do updetohen te baz te vlerave qe 
      // mer nga localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    // NOTE: mos ngaterohesh per her tjeter:
    // 
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {

    // The unshift() method of Array instances adds the specified elements to the beginning of an array and returns the new length of the array
    this.tasks.unshift({ // shtojme nje objekt 
      id: new Date().getTime().toString(),
      userId: userId, // foreignKey by user id, per te autorizuar tasqet e secilit user.
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks(); // updetojme tasks array 
  }

  removeTask(id: string) {

    // ** ideja se si e fshin keyword filter nje objekt eshte keshtu: **
    // nese do ishte task.id === id, do shfaqt vetem te objekt qe perputhet me id
    // ne rastin ton theret vetem ato objekte te cilat jan te ndryshme me id qe therasim nga removeTask(id: string)
    // duke updetuar localStorage me te dhena te reja, sa here qe fshim apo shtojme new tast with user id 
    this.tasks = this.tasks.filter((task) => task.id !== id); // fshim nje objekt by id
    this.saveTasks(); // updetojme tasks array 
  }

  private saveTasks() { 
    // per cdo update te tasks_array, updetojme dhe localStorage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    // i vetem BUG i vogel ketu ishte kur fshim te gjitha vlerat nga localStorage ajo ngelesh nje array bosht []
    // dhe kur i ben refresh browser kodi lexon localStorage me array bosh [], kur duhet te lexone private tasks = [...] me vlera
    // kesthu qe shtova reshtin me posht kur ska vlera, fshi email e localStorage
    // dhe sa here qe behet refresh browser kodi lexon private tasks = [...] dhe jo localStorage
    if (this.tasks.length == 0) localStorage.removeItem('tasks');
  }
}
