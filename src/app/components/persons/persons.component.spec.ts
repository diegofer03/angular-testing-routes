import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsComponent } from './persons.component';
import { Person } from 'src/app/models/person.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PeopleComponent } from '../people/people.component';
import { clickEvent, getText } from '@testing';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonsComponent, PeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should renderize 3 child Peoplecomponents', () => {
    component.people = [
      new Person('Jesus', 'LastName', 30, 80, 1.69),
      new Person('Andres', 'LastName', 30, 80, 1.69),
      new Person('Tiburon', 'LastName', 30, 80, 1.69),
    ]
    fixture.detectChanges()
    const debugElement : DebugElement[] = fixture.debugElement.queryAll( By.css('app-people'))

    expect(debugElement.length).toEqual(component.people.length)
  })

  it('should trigger event from child component', () => {
    component.people = [
      new Person('Jesus', 'LastName', 30, 80, 1.69),
      new Person('Andres', 'LastName', 30, 80, 1.69),
      new Person('Tiburon', 'LastName', 30, 80, 1.69),
    ]
    fixture.detectChanges()

    const buttonDebug : DebugElement[] = fixture.debugElement.queryAll(By.css('app-people .btn-choose'))
    buttonDebug[0].triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(component.selectedPerson).toEqual(component.people[0])

  })

  it('should render selectedPerson', () => {
    clickEvent(fixture,'app-people .btn-choose')
    fixture.detectChanges()
    const liTextContent = getText(fixture, '.selectedPerson ul>li')
    expect(liTextContent).toContain(component.people[0].name)
  })
});
