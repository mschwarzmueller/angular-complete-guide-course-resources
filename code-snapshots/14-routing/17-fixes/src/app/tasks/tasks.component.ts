import {
  Component,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, ResolveFn, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {

  // marim array me objecte me input nga users.routes.ts resolve: { userTasks: resolveUserTasks } nga TasksComponent.
  userTasks = input.required<Task[]>(); 

  // 1. kemi nje input sinjal i cili permban 3 vlera, fillestare undefind, asc dhe desc

  // 2. [queryParams]="{order: order() === 'asc' ? 'desc' : 'asc'}", kur e shtypim linkun 
  // gjenerojme nje objekt: { order: 'asc' } ose { order: 'desc' }, i cili bashkagjitet ne url:
  // http://localhost:4200/users/u2/tasks?order=asc or http://localhost:4200/users/u2/tasks?order=desc

  // 3. ku nga const order = activatedRouteSnapshot.queryParams['order']; marim string asc ose desc.
  order = input<'asc' | 'desc' | undefined>();

  // private activatedRoute = inject(ActivatedRoute);
  // userId = input.required<string>();
  // userName = input.required<string>();
  // message = input.required<string>();

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(data => console.log('data routes', data));
    // this.activatedRoute.queryParams.subscribe(data => console.log('data params', data));
  }
}

// 1. angular 18, na mundeson nje menyr te re, si ti bashkagjisim disa data brenda platformes routes.

// 2. ne rastin ton gjejme objektet qe jan krijuar nga nje user by id, dhe i bashkagjisim ne:
// user.routes.ts resolve: { userTasks: resolveUserTasks }, duke e theritur me input ne kete komponent:
// userTasks = input.required<Task[]>();.

// 3. pra user.routes.ts eshte femija i prinderit { path: 'users/:userId', component: UserTasksComponent }
// dhe cfare datash kemi regjistruar prenda prinderit dhe femis si: data: { message: 'Hello!' },
// resolve: { userName: resolveUserName }, title: resolveTitle, resolve: { userTasks: resolveUserTasks },
// i theras te dhenat e tyre me inputs: userId = input.required<string>(); userName = input.required<string>();
// message = input.required<string>(); per ti trasferuar ne template ku ne i shofim ato lehtesisht me subscribe
// nga: this.activatedRoute.data.subscribe(data => console.log('data routes', data));, 

// 4. nese nuk shtojme ne route kete sinstaks withComponentInputBinding(), e gjith llogjika e mesiperme nuk punon.

export const resolveUserTasks: ResolveFn<Task[]> = (  
  activatedRouteSnapshot,
  routerState 
) => {

  // 1. Nëse order është 'asc', rendit lista e tasks sipas id-së në mënyrë ngjitëse (nga më e 
  // vogla te më e madhja).

  // 2. Nëse order nuk është 'asc' (ose nuk ka fare vlerë), rendit lista e tasks sipas id-së 
  // në mënyrë zbritëse (nga më e madhja te më e vogla).

  const order = activatedRouteSnapshot.queryParams['order']; 
  // console.log("orderrrrrrr", order)

  const tasksService = inject(TasksService);

  // paramMap.get('userId') mer id nga url per te gjetur task e user 
  const tasks = tasksService.allTasks().filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  // Kjo kontrollon nëse ekziston një vlerë për order dhe nëse ajo është 'asc', që do të thotë 
  // renditje ngjitëse (nga më e vogla te më e madhja).
  if (order && order === 'asc') {
    // Ky bllok përdor metodën sort() të JavaScript-it për të renditur elementët në listën tasks 
    // sipas vlerës së id-së së secilit element (a dhe b janë dy elemente të listës).
    // Nëse a.id > b.id, rendit a pas b, kështu që kthen 1.
    // Nëse a.id është më i vogël ose i barabartë me b.id, rendit a para b, kështu që kthen -1.
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  // si funksjonon sort():
  // Krahason vlerën e a.id me vlerën e b.id.
  // Nëse a.id është më i madh se b.id, atëherë kthen 1, që do të thotë se a vendoset pas b në renditjen përfundimtare.
  // Nëse a.id është më i vogël ose i barabartë me b.id, atëherë kthen -1, që do të thotë se a vendoset para b.

  return tasks.length ? tasks : []; // return nese length > 0 -> array task nga lart posht ose nga posht lart 
};
