import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '', // 1. kur kemi nje url http://localhost:4200/users/u1 ose http://localhost:4200/users/userId
    redirectTo: 'tasks', // 2. e drejtojme application ne http://localhost:4200/users/u1/tasks
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    // 1. resolve eshte feature of Routes te ciles i bashkagjit te dhena brenda url.
    // 2. keto te dhena i marim nga: this.activatedRoute.data.subscribe(data => console.log('data routes', data));
    // 3. ose i marim me input: userTasks = input.required<Task[]>(); userName = input.required<string>();
    //  message = input.required<string>(); userId = input.required<string>();
    // 4. po te vem re kemi mar edhe vlerat message, userName dhe userId, te cilat i parkasim Prinderit Route 
    // te komponentit UserTasksComponent, ku nese nuk shtojme ne app.config.ts  withRouterConfig({  paramsInheritanceStrategy: 'always' }}
    // nuk i marem dot keto te dhena
    // 5. ndersa nese duam te marim me input ose me  this.activatedRoute resolve: { userTasks: resolveUserTasks } e ketit routes femije
    // ta percjellim te prindi UserTasksComponent, nuk mundemi dot sepse te dhenat qe mbarten ne url jan lokale, pra 
    // rrjedhja e url shkon prind - femije, dhe nuk vete femije - prind.
    resolve: {
      userTasks: resolveUserTasks, 
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    // canDeactivate eshte nje guard, qe parandalon largimin nga një komponent pa konfirmim kur ka të dhëna të paplota ose të papërfunduara.
    canDeactivate: [canLeaveEditPage] 
  }, 
];
    