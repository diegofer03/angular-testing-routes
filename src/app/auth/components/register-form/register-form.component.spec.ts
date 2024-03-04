import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { getText, query } from '@testing';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UserService>

  beforeEach(async () => {
    const spyUserService = jasmine.createSpyObj<UserService>('UserService', ['create'])

    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: UserService, useValue: spyUserService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be valid', () => {
    component.emailField?.setValue('')
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy()

    component.emailField?.setValue('12312')
    expect(component.emailField?.invalid).withContext('email valid').toBeTruthy()
  })

  it('should the passwordField be valid', () => {
    component.passwordField?.setValue('')
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy()

    component.passwordField?.setValue('12345')
    expect(component.passwordField?.invalid).withContext('min length').toBeTruthy()

    component.passwordField?.setValue('asdsadasd')
    expect(component.passwordField?.invalid).withContext('number').toBeTruthy()

    component.passwordField?.setValue('123asdf')
    expect(component.passwordField?.valid).withContext('valid').toBeTruthy()
  })

  it('should display ui message when error input email', () => {
    const inputEl: HTMLInputElement = query(fixture, '#email').nativeElement
    inputEl.value = ''
    inputEl.dispatchEvent(new Event('input'))
    inputEl.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    expect(component.emailField?.invalid).withContext('invalid').toBeTruthy()
    const errorRequiredText = getText(fixture, '#emailRequired')
    expect(errorRequiredText).withContext('empty field').toBeDefined()

    inputEl.value = '1231323'
    inputEl.dispatchEvent(new Event('input'))
    inputEl.dispatchEvent(new Event('blur'))
    fixture.detectChanges()

    const errorInvalidDeb = getText(fixture, '#invalidEmail')
    expect(errorInvalidDeb).toBeDefined()
  })

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmil.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: false
    });
    expect(component.form.invalid).toBeTruthy();
  })
});
