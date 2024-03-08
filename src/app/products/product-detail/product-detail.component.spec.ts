import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRouteStub, asyncData, mockObservable, query } from '@testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { generateOneProduct } from 'src/app/models/app.mocks';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productsService: jasmine.SpyObj<ProductsService>
  let router: ActivatedRouteStub
  let location: jasmine.SpyObj<Location>

  beforeEach(async () => {
    const spyProducts = jasmine.createSpyObj<ProductsService>('ProductsService', ['getOne'])
    const spyLocation = jasmine.createSpyObj<Location>('Location', ['back'])
    let activeRouteSub = new ActivatedRouteStub()

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        {provide: ProductsService, useValue: spyProducts},
        {provide: ActivatedRoute, useValue: activeRouteSub},
        {provide: Location, useValue: spyLocation}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>
    router = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub
    component = fixture.componentInstance;
    const productId = '2'
    router.setParamMap({id: productId})

    const productMock = {
      ...generateOneProduct(),
      id: productId
    }

    productsService.getOne.and.returnValue(mockObservable(productMock))
    //ngoninit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product', () => {
    fixture.detectChanges();
    const img = query(fixture, '#img')
    const title = query(fixture, '#title')
    const price = query(fixture, '#price')
    const description = query(fixture, '#description')

    expect(img).toBeDefined()
    expect(title).toBeDefined()
    expect(price).toBeDefined()
    expect(description).toBeDefined()
  })

  it('should go back when parameter is wrong', () => {
    const productId = null
    router.setParamMap({})
    fixture.detectChanges()
    expect(location.back).toHaveBeenCalled()
  })

  it('should show loading while request', fakeAsync(() => {
    const productId = '2'
    router.setParamMap({id: productId})
    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productsService.getOne.and.returnValue(asyncData(productMock))
    fixture.detectChanges()
    expect(component.status).toEqual('loading')
    expect(productsService.getOne).toHaveBeenCalledWith(productId)
    tick()
    fixture.detectChanges()
    expect(component.status).toEqual('success')
  }))

  it('should get queryParam', () => {
    const productId = '2';
    router.setParamMap({ id: productId });
    router.setQueryParamMap({ type: 'customer' });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productsService.getOne.and.returnValue(mockObservable(productMock));
    // Act
    fixture.detectChanges(); //ngOnInit
    fixture.detectChanges();

    expect(component.typeCustomer).toEqual('customer');
  })
});
