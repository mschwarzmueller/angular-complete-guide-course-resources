import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

// 'as' eshte nje metode, i cili modifikon emertimin e merit, nga routes, e therasim userRoutes
import { routes as userRoutes } from './users/users.routes'; 
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  UserTasksComponent,
  resolveTitle,
  resolveUserName,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Funksioni dummyCanMatch është një funksion për përputhje të rrugëve (route matching) që 
// përdoret për të vendosur nëse një përdorues duhet të ketë akses në një rrugë specifike. 
// Ky funksion mund të krahasohet me një gardian që vendos nëse një rrugë duhet të 
// aktivizohet ose nëse përdoruesi duhet të ridrejtohet diku tjetër

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random(); // // Gjeneron një numër të rastësishëm midis 0 dhe 1
  // console.log('Gardian shouldGetAccess ', shouldGetAccess);
  if (shouldGetAccess < 1) { // // Nëse numri është më i vogël se 1, lejon aksesin
    return true; // // Kjo rrugë është e vlefshme dhe përdoruesi mund të ketë qasje
  }
  // // Përndryshe, ridrejtohet te '/unauthorized'
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  { 
    path: '', 
    component: NoTaskComponent,
    // redirectTo: '/users/u1', 
    // pathMatch: 'full'
    title: 'No task selected',
  },
  { 
    path: 'users/:userId', 
    component: UserTasksComponent, 
    children: userRoutes, // femijest e prinderve te nje routes, quhen 'Nested Routes'.
    canMatch: [dummyCanMatch], 
    // 1. si data dhe resolve jan dy feature te ciles i bashkagjit te dhena brenda url.
    // 2. keto te dhena i marim nga: this.activatedRoute.data.subscribe(data => console.log('data routes', data));
    // 3. ose i marim me input: userName = input.required<string>(); dhe message = input.required<string>();
    // 4. per te funksjonuar keto features of Routes, shtojme ne app.config.ts: withComponentInputBinding()
    data: { // data mer vlera statike 
      message: 'Hello!', 
    },
    resolve: { // resolve mer data dinamike, te ndryshushme
       userName: resolveUserName,
    },
     title: resolveTitle, // ** kjo e shfaq emrin e user brenda ikones se faqes **
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]; 
  