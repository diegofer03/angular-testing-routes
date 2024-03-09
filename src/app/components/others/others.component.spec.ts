import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersComponent } from './others.component';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from 'src/app/directives/highlight.directive';
import { ProductsService } from 'src/app/services/products/products.service';
import { generateManyProducts } from 'src/app/models/app.mocks';
import { mockObservable } from '@testing';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let productsService : jasmine.SpyObj<ProductsService>

  beforeEach(async () => {
    const spyProductService = jasmine.createSpyObj<ProductsService>('ProductsService', ['getAll'])
    await TestBed.configureTestingModule({
      declarations: [ OthersComponent, HighlightDirective ],
      imports: [FormsModule],
      providers: [
        {provide: ProductsService, useValue: spyProductService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    const productsMock = generateManyProducts()
    productsService.getAll.and.returnValue(mockObservable(productsMock))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
