import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>();

  private tasksService = inject(TasksService);

  // Router është një shërbim që përdoret për të naviguar në rrugë (routes) të ndryshme të aplikacionit.
  private router = inject(Router);

  // ActivatedRoute është një shërbim që jep informacion mbi rrugën aktuale të aktivizuar, duke përfshirë 
  // parametra, query params, dhe segmente rruge.
  private activatedRoute = inject(ActivatedRoute);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload',
      queryParamsHandling: 'preserve',
    });
  }
}

// relativeTo: this.activatedRoute:
// Kjo përcakton që rruga ku do të navigohet duhet të jetë relative ndaj rrugës aktuale.
// activatedRoute përmban të dhëna mbi rrugën aktuale të aktivizuar, dhe duke e përdorur 
// këtë opsion, mund të vazhdosh navigimin nga një rrugë relative.

// onSameUrlNavigation: 'reload':
// Ky opsion përcakton se çfarë ndodh nëse navigon në të njëjtën URL që je aktualisht.
// 'reload' thotë që edhe nëse je në të njëjtën rrugë, komponenti duhet të rifreskohet 
// plotësisht. Pa këtë opsion, Angular nuk do ta rifreskonte komponentin nëse je duke 
// naviguar në të njëjtën rrugë.

// queryParamsHandling: 'preserve':
// Ky opsion ruan parametrat ekzistues të query nga URL-ja kur bën navigimin.
// 'preserve' siguron që parametrat aktualë të query të ruhen në URL edhe pasi të ketë 
// ndodhur navigimi. Pa këtë, parametrat mund të humben kur ndryshon rruga.

// Permbledhja: 
// Ky kod po bën një navigim programatik brenda rrugës aktuale relative ndaj rrugës së 
// aktivizuar (ActivatedRoute), duke ruajtur parametrat e query që ndodhen aktualisht 
// në URL dhe duke siguruar që komponenti të rifreskohet nëse po navigon në të njëjtën rrugë.
