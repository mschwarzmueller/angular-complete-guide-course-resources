import { Routes } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  {
    path: 'tasks', // <your-domain>/tasks
    component: TasksComponent,
  },
];
