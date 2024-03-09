import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { RouterTestingModule } from "@angular/router/testing"
import { Component, NO_ERRORS_SCHEMA } from "@angular/core"
import { Router, RouterLinkWithHref } from "@angular/router"
import { clickElemnt, getText, mockObservable, query, queryAllByDirective } from "@testing"
import { AppModule } from "./app.module"
import { AppRoutingModule, routes } from "./app-routing.module"
import { ProductsService } from "./services/products/products.service"
import { generateManyProducts } from "./models/app.mocks"
import { generateOneUser } from "./models/user.model"
import { AuthService } from "./services/auth/auth.service"

// @Component({
//   selector: 'app-banner'
// })class BannerComponentSub{}

// @Component({
//   selector: 'app-footer'
// })class FooterComponentSub{}

// @Component({
//   selector: 'app-people'
// })
// class PeopleComponent {}

// @Component({
//   selector: 'app-others'
// })
// class OthersComponent {}

// @Component({
//   selector: 'app-pico-preview'
// })
// class PicoPreviewComponent {}

// const routes = [
//   {
//     path: 'pico-preview',
//     component: PicoPreviewComponent
//   },
//   {
//     path: 'people',
//     component: PeopleComponent
//   },
//   {
//     path: 'others',
//     component: OthersComponent
//   },
// ]

describe('integatrion test', () => {
  let fixture : ComponentFixture<AppComponent>
  let component : AppComponent
  let router : Router
  let productsService : jasmine.SpyObj<ProductsService>
  let authService : jasmine.SpyObj<AuthService>

  beforeEach(async () => {
    const spyProductService = jasmine.createSpyObj<ProductsService>('ProductsService', ['getAll'])
    const spyAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['getUser'])
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers:[
        {provide: ProductsService, useValue: spyProductService},
        {provide: AuthService, useValue: spyAuthService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach( fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    fixture.detectChanges()

    router = TestBed.inject(Router)
    router.initialNavigation()
    tick()
    fixture.detectChanges()
  }))

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(7);
  });

  it('should go and render the others router with active session', fakeAsync(() => {
    const productsMock = generateManyProducts()
    productsService.getAll.and.returnValue(mockObservable(productsMock))
    const userMock = generateOneUser()
    authService.getUser.and.returnValue(mockObservable(userMock))
    clickElemnt(fixture, '#othersRoute')

    tick() //while nav
    fixture.detectChanges()//nginit otherscomponents
    tick() //excecute getall in component
    fixture.detectChanges()//nginit otherscomponents

    const text =  getText(fixture, '#products-length')
    expect(router.url).toEqual('/others')
    expect(query(fixture, 'app-others')).toBeDefined()
    expect(text).toContain(productsMock.length);
  }))

  it('should redirect when no session detected', fakeAsync(() => {
    authService.getUser.and.returnValue(mockObservable(null))
    clickElemnt(fixture, '#othersRoute')
    tick()
    fixture.detectChanges()
    tick()
    fixture.detectChanges()
    expect(router.url).toEqual('/')
  }))

  it ('should render pico preview when clicked', fakeAsync(() => {
    clickElemnt(fixture, '#picoRoute')
    tick()
    fixture.detectChanges()
    expect(router.url).toEqual('/pico')
    expect(query(fixture, 'app-pico-preview')).toBeDefined()
  }))
})
