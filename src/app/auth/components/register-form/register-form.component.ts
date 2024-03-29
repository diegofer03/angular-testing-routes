import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MyValidators } from './../../../utils/validators';

import { UserService } from './../../../services/user/user.service';
import { CreateUserDTO } from 'src/app/models/app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  status : 'init' | 'loading' | 'success' | 'failed' = 'init'

  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(event: Event) {
    this.status = 'loading'
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value as CreateUserDTO;
      this.usersService.create(value)
      .subscribe({
        next: (rta) => {
          console.log(rta);
          this.status = 'success'
          this.router.navigateByUrl('/auth/login')
        },
        error: (error) => {
          this.status = 'failed'
        }
      });
    } else {
      this.status='failed'
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
