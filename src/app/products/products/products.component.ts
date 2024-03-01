import { Component, inject } from '@angular/core';
import { Product, loading } from 'src/app/models/app.models';
import { ProductsService } from 'src/app/services/products/products.service';
import { ValueService } from 'src/app/services/value/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productService = inject(ProductsService)
  valueService = inject(ValueService)
  products : Product[] = []
  limit = 10
  offset = 0
  status: loading = 'init'
  rta = ''

  ngOnInit(){
    this.getAllProducts()
  }

  getAllProducts(){
    this.status = 'loading'
    this.productService.getAll(this.limit, this.offset).subscribe({
      next: (data) => {
        this.products = [...this.products,...data]
        this.offset += this.limit
        this.status = 'success'
      },
      error: (error) => {
        this.status = 'error'
        console.log(error)
      }
    })
  }

  async getPromise(){
    const rta = await this.valueService.getPromiseValue()
    this.rta = rta
  }
}
