import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { generateManyProducts } from 'src/app/models/app.mocks';
import { of } from 'rxjs';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<ProductsService>('ProductsService', ['getAll'])

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        {provide: ProductsService, useValue: spy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    // fixture.detectChanges();
    const productsMock = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {

    expect(component).toBeTruthy();
    expect(productsService.getAll).toHaveBeenCalled();
    // expect(component).toBeTruthy();
  });

  it('should get list from request pagination', () => {
    component.products = []
    const productsMock = generateManyProducts(10)
    productsService.getAll.and.returnValue(of(productsMock))
    component.getAllProducts()
    fixture.detectChanges()
    expect(component.products.length).toEqual(productsMock.length)
  })
});
