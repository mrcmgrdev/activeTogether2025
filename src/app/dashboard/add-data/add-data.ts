import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-data',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-data.html',
  styleUrl: './add-data.scss',
})
export class AddData {
  private fb = inject(FormBuilder);

  store = inject(Store);
  backend = inject(Backend);

  signupForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    birthdate: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    newsletter: [false],
    courseId: [0, Validators.required],
  });

  onSubmit() {
    if (this.signupForm.valid) {
      this.backend.addRegistration(this.signupForm.getRawValue());
      this.signupForm.reset();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.signupForm.get(field);
    if (control?.hasError('required')) {
      return 'Dieses Feld ist erforderlich';
    }
    if (control?.hasError('email')) {
      return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    if (control?.hasError('minlength')) {
      return `Mindestens ${control.errors?.['minlength'].requiredLength} Zeichen erforderlich`;
    }
    if (control?.hasError('maxlength')) {
      return `Maximal ${control.errors?.['maxlength'].requiredLength} Zeichen erlaubt`;
    }
    return '';
  }
}
