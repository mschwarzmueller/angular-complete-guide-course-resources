import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, CanDeactivateFn, Router, RouterLink } from '@angular/router';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  // 1. marim me input userId nga url: http://localhost:4200/users/u2/tasks/new, pra u2
  // njesoj si kur ta mernim nga activatedRoute me paramMap duke perdorur features 
  // of Routes: withRouterConfig({ paramsInheritanceStrategy: 'always' }).

  // 2. per vec userId, marim message dhe userName.

  // 3. vem re se nuk mund te marim vlerat userTasks te komponentit TasksComponent edhe pse 
  // eshte femija i komponentit prind te perbashket
  userId = input.required<string>();  

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal(''); 
  submitted = false;
  
  private tasksService = inject(TasksService);
  private router = inject(Router);

  // private activatedRoute = inject(ActivatedRoute);

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe(data => console.log('data routes', data));
  // }

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(), 
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      }, 
      this.userId()
    );
    this.submitted = true;

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}

// Krijojme nje funksjon Guard i cili e parandalon user, nese ka vlera brenda form dhe ai do te lundroj ne nje faqe tjeter, i shfaqet
// nje dialog me mesazhin: ' Do you really want to leave? You will lose the entered data. '.
export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {

  // Nëse submitted është true, përdoruesi ka dërguar formën, prandaj largimi është i sigurt dhe funksioni kthen true për të lejuar largimin.
  if (component.submitted) {
    return true;
  }

  // nese nje nga input eshte flase na shaqet dialog me mesazhin me posht, duke na dhen akses te kalojme ne nje faqe tjeter.
  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    return window.confirm('Do you really want to leave? You will lose the entered data.')
  }

  // Nëse përdoruesi pranon mesazhin, true lejon largimin; përndryshe, false e bllokon atë dhe e lë përdoruesin në të njëjtën faqe.
  return true;
}
