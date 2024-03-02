import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { generateManyProducts } from 'src/app/models/app.mocks';
import { defer, of } from 'rxjs';
import { Product } from 'src/app/models/app.models';
import { ValueService } from 'src/app/services/value/value.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { asyncData, asyncError, mockObservable, mockPromise } from '@testing';

describe('ProductsComponent', () => {
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
    productsService.getAll.and.returnValue(mockObservable(productsMock));
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
      productsService.getAll.and.returnValue(mockObservable(productsMock))
      component.getAllProducts()
      fixture.detectChanges()
      expect(component.products.length).toEqual(productsMock.length)
    })

    it('should change state loading -> success in request', fakeAsync(() => {
      const productsMock = generateManyProducts(10)
      productsService.getAll.and.returnValue(asyncData(productsMock))
      component.getAllProducts()
      fixture.detectChanges()
      expect(component.status).toEqual('loading')
      tick()
      fixture.detectChanges()
      expect(component.status).toEqual('success')
    }))

    it('should change state loading -> error in request', fakeAsync(() => {
      productsService.getAll.and.returnValue(asyncError('error'))
      component.getAllProducts()
      fixture.detectChanges()
      expect(component.status).toEqual('loading')
      tick()
      fixture.detectChanges()
      expect(component.status).toEqual('error')
    }))

    it('should make request when button trigger', fakeAsync(() => {
      const mockProducts = generateManyProducts(10)
      productsService.getAll.and.returnValue(asyncData(mockProducts))
      const buttonDeb : DebugElement = fixture.debugElement.query(By.css('#btnProducts'))
      buttonDeb.triggerEventHandler('click', null)
      fixture.detectChanges()
      expect(component.status).toEqual('loading')
      tick()
      fixture.detectChanges()
      expect(component.status).toEqual('success')
      expect(productsService.getAll).toHaveBeenCalled()
    }))
  })

  describe('testing promise call', () => {
    it('should return promise succesfully', async () => {
      const mockMsg = 'promise'
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMsg))
      await component.getPromise()
      fixture.detectChanges()
      expect(component.rta).toEqual(mockMsg)
      expect(valueService.getPromiseValue).toHaveBeenCalled()
    })

    it('should exceute promise call when button trigger', fakeAsync (() => {
      const mockMsg = 'new promise'
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMsg))
      const buttonDeb : DebugElement = fixture.debugElement.query(By.css('#btnPromise'))
      buttonDeb.triggerEventHandler('click', null)
      tick()
      fixture.detectChanges()
      const pElem : HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement
      expect(pElem.textContent).toContain(mockMsg)
    }))
  })
});
