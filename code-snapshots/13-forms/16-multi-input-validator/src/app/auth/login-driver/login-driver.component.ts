import { Component, DestroyRef,afterNextRender, inject, viewChild } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-driver.component.html',
  styleUrl: './login-driver.component.css'
}) 
export class LoginDriverComponent {

  // viewChild.required<NgForm>('form'); perfaqeson #form="ngForm" , nga e cila marim vlera me subscribe nga
  // this.form().valueChanges dhe japim vlera ne input email nga this.form().controls['email'].setValue(savedEmail);
  private form = viewChild.required<NgForm>('form'); 
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => { // ** eshte e barabart me ngAfterViewInit() **

      // 4. edhe pse bejme reload faqes ose submit, marim string email qe kemi te regjistruar ne localStorage 
      const savedForm = window.localStorage.getItem('saved-login-form'); 

      if (savedForm) { // if string value email 
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail); // 5. return string value email brenda input email
        }, 1);
      } 

      // 1. pra i bejme subscribe cdo shkronje qe shtypim ne dy input email dhe password duke i regjistruan ne
      // localStorage vetem vleren email, qe kur ti bejme reload faqes ato, mos te na fshihen, por vlera te jen 
      // brenda input email, nese nuk eshte ber sumbit.

      // ** nese behet submit, vlerat fshihen nga inputs nga formData.form.reset(); dhe mbas 0.5 sekondave 
      // fshihen nga localStorage **

      // ** valueChanges i ben subscribe sa here shtypim vlera brenda inputs email dhe password. **
      // ** ndersa '?' pas valueChange eshte sepse vlera fillestare eshte null **
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)) // te cilat ndodhin mbas 0.5 sekondash, kur kemi ndaluar se shkuari 
        .subscribe({
          next: (value) => {
            console.log("value", value);
            window.localStorage.setItem( 
              'saved-login-form',
              JSON.stringify({ email: value.email }) // 2. regjistrojme input string ne localStorage
            )
          }
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe()); // 3. mbyllim subscription kur mbaron
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    // ** edhe kur ti bejme submit, regjitstrojme string value email ne localStarage ** 
    window.localStorage.setItem( 'saved-login-form',JSON.stringify({ email: enteredEmail }));

    console.log(formData.form);
    console.log(enteredEmail, enteredPassword);

     formData.form.reset();
  }

}
