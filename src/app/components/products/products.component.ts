import { Component, inject } from '@angular/core';
import { Product, loading } from 'src/app/models/app.models';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productService = inject(ProductsService)
  products : Product[] = []
  limit = 10
  offset = 0
  status: loading = 'init'

  ngOnInit(){
    this.getAllProducts()
  }

  getAllProducts(){
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
}
