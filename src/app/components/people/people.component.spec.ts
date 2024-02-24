import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have <p> with "Soy un parrafo"', () => {
  //   const personElement: HTMLElement = fixture.nativeElement;
  //   const p = personElement.querySelector('p');
  //   expect(p?.textContent).toEqual('Soy un parrafo');
  // });

  it('should initialize person instance', () => {
    component.person = new Person('alex', 'efe', 22, 85, 188)
    expect(component.person.name).toBe('alex')
  })

  it('should have <p> with person.height', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    component.person = new Person('alex', 'efe', 22, 85, 188)

    fixture.detectChanges()

    expect(pElement?.textContent).toContain(component.person.heigth);
  });

  it('should have <h3> with "Hola, person.name"</h3>', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;

    component.person = new Person('alex', 'efe', 22, 85, 188)
    fixture.detectChanges()

    expect(h3?.textContent).toContain(component.person.name);
  });

  it('Should execute calcularImc', () => {
    const buttonElem : HTMLElement = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement
    component.person = new Person('alex', 'efe', 22, 85, 188)
    component.calcularImc()
    fixture.detectChanges()
    expect(buttonElem.textContent).toContain(component.person.calcIMC())
  })
  it('should execute calcuarImc with button click', () => {
    const buttonDeb : DebugElement = fixture.debugElement.query(By.css('button.btn-imc'))
    const buttonElem : HTMLElement = buttonDeb.nativeElement
    component.person = new Person('alex', 'efe', 22, 85, 188)
    buttonDeb.triggerEventHandler('click', null)
    fixture.detectChanges()
    expect(buttonElem.textContent).toContain(component.person.calcIMC())
  })
  it('should emmit event output when button clicks', () => {
    const buttonDeb : DebugElement = fixture.debugElement.query(By.css('button.btn-choose'))
    // const buttonElem : HTMLElement = buttonDeb.nativeElement
    const expectPerson = new Person('alex', 'efe', 22, 85, 188)
    component.person = expectPerson
    let selectPerson : Person | undefined

    component.onSelec.subscribe(person => {
      selectPerson = person
    })

    buttonDeb.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(selectPerson).toEqual(expectPerson)
  })
});
