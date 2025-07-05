import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) {

  // AbstractControl është përdorur për të përfaqësuar të gjithë kontrollin e formës 
  // (si një kontroll i vetëm, grupi i kontrollit, ose një listë kontrollesh). Kjo e 
  // bën atë një klasë të përgjithshme që funksionon në mënyrë të unifikuar për të 
  // gjitha llojet e kontrolleve.

  // Termi "abstract" reflekton idenë e abstraktimit, që do të thotë se AbstractControl 
  // ofron një shtresë abstrakte që fsheh detajet specifike të implementimit të kontrollit 
  // të formës dhe ofron vetëm funksionalitete të përbashkëta. Përdoruesit e Angular-it 
  // nuk kanë nevojë të dinë detajet specifike të implementimit, por mund të punojnë me 
  // FormControl, FormGroup, ose FormArray për të menaxhuar validimin dhe ndërveprimin e formave.

  // Disa nga funksionalitetet që AbstractControl siguron për të gjitha nënklasat e tij përfshijnë:
  // value: Merr vlerën e kontrollit.
  // valid: Kontrollon nëse vlera është e vlefshme sipas validatorëve të caktuar.
  // invalid: Kontrollon nëse vlera është e pavlefshme.
  // errors: Merr gabimet nëse kontrolli është i pavlefshëm.
  // setValue() dhe patchValue(): Vendos ose modifikon vlerën e kontrollit.

  // Ky validator i personalizuar (equalValues) i bashkangjitet FormGroup duke e vendosur te validators, ku krahasohet password me confirmPassword.
  return (control: AbstractControl) => {
   
    const val1 = control.get(controlName1)?.value; // marim vlerat nga formControlName="password"
    const val2 = control.get(controlName2)?.value; // marim vlerat nga formControlName="confirmPassword"

    if (val1 === val2) {
      return null; // nese nuk ka error null 
    }

    return { valuesNotEqual: true };// ne te kurnder, nese nuk perputher erro = true
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  form = new FormGroup({ // FormGroup përdoret për të grupuar disa FormControl që lidhen me njëra-tjetrën

    email: new FormControl('', { validators: [Validators.email, Validators.required] }),

    passwords: new FormGroup( // formGroupName="passwords"
      {

        password: new FormControl('', { 
          validators: [Validators.required, Validators.minLength(6)], // formControlName="password"
        }),

        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)], // formControlName="confirmPassword"
        }),

      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),

    firstName: new FormControl('', { validators: [Validators.required] }), //  formControlName="firstName"

    lastName: new FormControl('', { validators: [Validators.required] }),

    address: new FormGroup({

      street: new FormControl('', { validators: [Validators.required] }),

      number: new FormControl('', { validators: [Validators.required] }),

      postalCode: new FormControl('', { validators: [Validators.required] }),

      city: new FormControl('', { validators: [Validators.required] }),

    }),

    // vlera janë të vlefshme për këtë kontrol: 'student' | 'teacher' | 'employee' | 'founder' | 'other'
    // Vlera e paracaktuar - defalut është 'student'
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', { validators: [Validators.required] }),

    // Përdorimi i FormArray është shumë i dobishëm kur ke një numër variabël të kontrollesh, ose kur 
    // dëshiron të menaxhosh një grup të strukturuar në mënyrë të përsëritur, siç janë checkbox-et në këtë rast.

    source: new FormArray([
      // Çdo FormControl brenda këtij FormArray është i inicializuar me false, që do të thotë se në fillim 
      // të gjitha kutitë e kontrollit (checkbox) janë të paszgjedhura.
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    agree: new FormControl(false, { validators: [Validators.required] }),

    // ** Ndryshimi i FormGroup me FormArray eshte se, FormGroup bashkangjit shum llojshmeri vlerash si string,
    // number, boolean, array, brenda nje FormGroup ose objekt form, kurse FormArray, pranon nje ose me shum vlera, 
    // te jen te njeta, pra te jen 4 vlera boolean, ose 4 vlera string, nuk lejon qe brenda nje array te ket 2 velra
    // boolean dhe 2 vlera string. Ky eshte ndryshimi.

  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }
 
    console.log('this.form', this.form);
  }

  onReset() {
    this.form.reset();
  }
}

// ** NJE SHEMBULL SHUM I BUKUR **

// const formArray = new FormArray([ // brenda formArray kemi 2 FormGroup te njejta nga menyra e ndertimit

//   new FormGroup({// kurse ketu kemi dy FormControll te ndrysme
//     label: new FormControl('Item 1'),   // string
//     quantity: new FormControl(10),      // number
//   }),

//   new FormGroup({
//     label: new FormControl('Item 2'),   // string
//     quantity: new FormControl(5),       // number
//   }),

// ]);
