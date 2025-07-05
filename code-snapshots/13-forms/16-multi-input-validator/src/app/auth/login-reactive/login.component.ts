import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) { // brenda string passwrod duhet te kete nje '?'
    return null;
  }

  return { doesNotContainQuestionMark: true }; // nese jo, return error true
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') { // email nuk duhet te jet i ngjashem me 'test@example.com'
    return of(null);
  }
 
  return of({ notUnique: true }); // nese eshte i gjashem, return valid or error: true 
}

// ** eshte e njejta gje me kodin brenda ngOnInit, ku shtojme: email: new FormControl(initialEmailValue, { **

// let initialEmailValue = '';
// const savedForm = window.localStorage.getItem('saved-login-form');

// if (savedForm) {
//   const loadedForm = JSON.parse(savedForm);
//   initialEmailValue = loadedForm.email;
// }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({

    // ** nuk eshte nevoj te shtojme 'initialEmailValue' ne FormControl email: email: new FormControl(initialEmailValue, {
    // per te trasferuar vleren brenda input kur ti bejme refresh faqes, sepse kete veprim e bejme nga patchValue:
    // this.form.patchValue({email: loadedForm.email});, thjesht e lem empty: '' **
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique], // validim me funksjon 
    }),
    
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),

  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  } 

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty && // Tregon nëse vlera e fushës është ndryshuar nga vlera fillestare.
      this.form.controls.password.invalid // Tregon nëse fusha nuk përmbush validimin
    );
  }

  ngOnInit() {

    // 3. dhe sa here ti bejme refresh faqes shkronjat ne input e email te mos humbasin, te jen te njeta para dhe pas reloady 
    const savedForm = window.localStorage.getItem('saved-login-form'); // duke i mar vlerat nga localStorage 

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      this.form.patchValue({email: loadedForm.email}); // 4. duke i bashkagjitur vlerat ne input email nga [formControl]="form.controls.email"
    }

    // 1. ketu bejme subscribe cdo 0.5 sekonda cdo vlere qe shtypim ne inputin email dhe password nga valueChanges
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))// ** mbasi kemi ndalur se shkruari 0.5 sekonda funksjoni behet subscribe **
      .subscribe({
        next: (value) => {
          window.localStorage.setItem( //2. duke bashkagjitur ne localStorage vetem vleren input email 
            'saved-login-form',
            JSON.stringify({ email: value.email })
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);

    this.form.reset();
  }
}
