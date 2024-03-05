import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { asyncData, asyncError, clickElemnt, getText, mockObservable, query, setCheckValue, setInputValue } from '@testing';
import { generateOneUser } from 'src/app/models/user.model';

describe('RegisterFormComponent', () => {
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
    setInputValue(fixture, '#email', '')
    fixture.detectChanges()
    expect(component.emailField?.invalid).withContext('invalid').toBeTruthy()
    const errorRequiredText = getText(fixture, '#emailRequired')
    expect(errorRequiredText).withContext('empty field').toBeDefined()

    setInputValue(fixture, '#email', '1231232')
    fixture.detectChanges()

    const errorInvalidDeb = getText(fixture, '#invalidEmail')
    expect(errorInvalidDeb).toBeDefined()
  })

  it('should the form be valid and complete succesfully request', fakeAsync(() => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmil.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: true
    });
    const mockUser = generateOneUser()
    userService.create.and.returnValue(asyncData(mockUser))
    component.register(new Event('submit'))
    expect(component.status).toEqual('loading')
    tick()
    expect(component.status).toEqual('success')
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled()
  }))

  it('should submit fomr successfully from UI fields ', fakeAsync(() => {
    setInputValue(fixture, '#name', 'Nico')
    setInputValue(fixture, '#email', 'nico@gmil.com')
    setInputValue(fixture, '#password','12121212')
    setInputValue(fixture, '#confirmPassword', '12121212')
    setCheckValue(fixture, '#terms', true)
    const mockUser = generateOneUser()
    userService.create.and.returnValue(asyncData(mockUser))
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'))
    clickElemnt(fixture, '#submitBtn')
    fixture.detectChanges()
    expect(component.form.valid).toBeTruthy()
    expect(component.status).toEqual('loading')
    tick()
    expect(userService.create).toHaveBeenCalled()
    expect(component.status).toEqual('success')
  }))

  it('should handle fail request in api', fakeAsync(() => {
    setInputValue(fixture, '#name', 'Nico')
    setInputValue(fixture, '#email', 'nico@gmil.com')
    setInputValue(fixture, '#password','12121212')
    setInputValue(fixture, '#confirmPassword', '12121212')
    setCheckValue(fixture, '#terms', true)
    userService.create.and.returnValue(asyncError('error'))
    query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'))
    fixture.detectChanges()
    expect(component.form.valid).toBeTruthy()
    expect(component.status).toEqual('loading')
    tick()
    expect(userService.create).toHaveBeenCalled()
    expect(component.status).toEqual('failed')
    fixture.detectChanges()
    const errorLabel =  query(fixture, '#errorMsg').nativeElement
    expect(errorLabel).toBeDefined()
  }))
});
