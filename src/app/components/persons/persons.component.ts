import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent {

  person: Person = new Person('Name', 'LastName', 30, 80, 1.69);

  onSelec(person: Person){
    console.log(person)
  }
}
