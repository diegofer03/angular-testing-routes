import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { generateManyProducts } from 'src/app/models/app.mocks';
import { defer, of } from 'rxjs';
import { Product } from 'src/app/models/app.models';
import { ValueService } from 'src/app/services/value/value.service';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>
  let valueService: jasmine.SpyObj<ValueService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<ProductsService>('ProductsService', ['getAll'])
    const valueSpy = jasmine.createSpyObj<ValueService>('ValueService', ['getPromiseValue'])

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        {provide: ProductsService, useValue: spy},
        {provide: ValueService, useValue: valueSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
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

  describe('testing getAll', () => {
    it('should get list from request pagination', () => {
      component.products = []
      const productsMock = generateManyProducts(10)
      productsService.getAll.and.returnValue(of(productsMock))
      component.getAllProducts()
      fixture.detectChanges()
      expect(component.products.length).toEqual(productsMock.length)
    })

    it('should change state loading -> success in request', fakeAsync(() => {
      const productsMock = generateManyProducts(10)
      productsService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)))
      component.getAllProducts()
      fixture.detectChanges()
      expect(component.status).toEqual('loading')
      tick()
      fixture.detectChanges()
      expect(component.status).toEqual('success')
    }))

    it('should change state loading -> error in request', fakeAsync(() => {
      productsService.getAll.and.returnValue(defer(() => Promise.reject('error')))
      component.getAllProducts()
      fixture.detectChanges()
      expect(component.status).toEqual('loading')
      tick()
      fixture.detectChanges()
      expect(component.status).toEqual('error')
    }))
  })

  describe('testing promise call', () => {
    it('should return promise succesfully', async () => {
      const mockMsg = 'promise'
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg))
      await component.getPromise()
      fixture.detectChanges()
      expect(component.rta).toEqual(mockMsg)
      expect(valueService.getPromiseValue).toHaveBeenCalled()
    })
  })
});
