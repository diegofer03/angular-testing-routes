import { Component, inject } from '@angular/core';
import { Product } from 'src/app/models/app.models';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent {
  productService = inject(ProductsService)
  products: Product[] = []
  color = 'blue'

  ngOnInit() {
    this.productService.getAll()
    .subscribe(data => {
      this.products = data;
    })
  }
}
