import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  @Input() person! : Person
  imc : string = ''

  calcularImc(){
    this.imc = this.person.calcIMC()
  }

}
