import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/app.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product! : Product

}
