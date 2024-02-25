import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent {

  people: Person[] = [
    new Person('Jesus', 'LastName', 30, 80, 1.69),
    new Person('Andres', 'LastName', 30, 80, 1.69),
  ];
  selectedPerson : Person | null = null

  onSelec(person: Person){
    console.log(person)
    this.selectedPerson = person
  }
}
