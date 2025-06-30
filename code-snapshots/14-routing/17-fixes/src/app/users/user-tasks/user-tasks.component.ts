import { Component, DestroyRef, inject, input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {

  // vjen nga app.routes.ts: resolve: { userName: resolveUserName }
  userName = input.required<string>();

  // vjen nga app.routes.ts: data: { message: 'Hello!' }
  message = input.required<string>();

  // private activatedRoute = inject(ActivatedRoute);

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe(data => console.log('data routes', data));
  // }
  
}

// 1. shtypet linku ne komponentin user.component.html: <a [routerLink]="['/users', user().id, 'tasks']"  routerLinkActive="selected">
// 2. angular na perjecll te prindi i komponenteve te routers te users, ku nga userId gjeme emrin e users.
// 3. pasi e gjejme emrin e users funksjonin resolveUserName e exportojme ne app.routes.ts: resolve {userName: resolveUserName}.
// 4. nga app.routes.ts: resolve {userName: resolveUserName} e marim me input string user: userName = input.required<string>();
// 5. per te funksjonuar e gjith kjo procedura shtojme ne app.config.ts nje nga features of routes: withComponentInputBinding()

// ** ky lloj shembulli ketu behet per te ividentuar sa me shum subscribe, sepse sa me shum subscribe ka application
// aq me shum i ngadalte do behet application kur te behet deployment**

// ** duke ke qen se ky funksjone eshte export dhe jasht kllapate te komponentit nuk mundemi ta bashkagjisim ne templateUrl,
// parandaj e dergojme ne app.routes.ts: {path: 'users/:userId', component: UserTasksComponent, resolve {userName: resolveUserName},
// per ta terhequr vleren string nga userName = input.required<string>(); **

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, // Përdoret për të marrë detajet e rrugës aktuale, në këtë rast.
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);

  const userName = usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId') // Merr ID e përdoruesit nga rruga (URL)
  )?.name || ''; // Kërkon emrin e përdoruesit që përputhet me ID-në

  return userName; // Kthen emrin e përdoruesit
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  // Funksioni thërret resolveUserName dhe i shton 's Tasks në fund. Kjo krijon një titull të tillë si "John's Tasks".
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks'
}

// 6. ose kemi shembullim e vjeter, me posht:

// private activatedRoute = inject(ActivatedRoute);
// private usersService = inject(UsersService);
// private destroyRef = inject(DestroyRef);
// userNameSingal = signal<string>('');

// ngOnInit(): void {
//   const subscription = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {

//     if ( paramMap.has('userId') ) {

//       const user = this.usersService.users.find( (u) => u.id === paramMap.get('userId') )?.name || '';
//       console.log(' just a test old', user);

//       this.userNameSingal.set(user);
//     }

//   });

//   this.destroyRef.onDestroy(() => { 
//     subscription.unsubscribe();
//   });
// }
// } 

// <h2>{{ userNameSingal() }} Tasks</h2>

// ** shembulli 2, me i thjesht se i pari **

// private activatedRoute = inject(ActivatedRoute);
// private usersService = inject(UsersService);
// private destroyRef = inject(DestroyRef);
// userNameTest: string = '';

// ngOnInit(): void {
//   const subscription = this.activatedRoute.paramMap.subscribe({
//     next: paramMap => {
//       this.userNameTest = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
//     }
//   }); 

//   this.destroyRef.onDestroy(() => { subscription.unsubscribe(); });
// }

// }

