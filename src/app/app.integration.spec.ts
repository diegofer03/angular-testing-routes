import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { RouterTestingModule } from "@angular/router/testing"
import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { clickElemnt, query } from "@testing"

@Component({
  selector: 'app-banner'
})class BannerComponentSub{}

@Component({
  selector: 'app-footer'
})class FooterComponentSub{}

@Component({
  selector: 'app-people'
})
class PeopleComponent {}

@Component({
  selector: 'app-others'
})
class OthersComponent {}

@Component({
  selector: 'app-pico-preview'
})
class PicoPreviewComponent {}

const routes = [
  {
    path: 'pico-preview',
    component: PicoPreviewComponent
  },
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'others',
    component: OthersComponent
  },
]

fdescribe('integatrion test', () => {
  let fixture : ComponentFixture<AppComponent>
  let component : AppComponent
  let router : Router

  beforeEach( fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        BannerComponentSub,
        FooterComponentSub,
        PeopleComponent,
        PicoPreviewComponent,
        OthersComponent
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    router = TestBed.inject(Router)
    router.initialNavigation()
    tick()
    fixture.detectChanges()
  }))

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should go and render the others router', fakeAsync(() => {
    clickElemnt(fixture, '#othersRoute')
    tick() //while nav
    fixture.detectChanges()//nginit otherscomponents
    expect(router.url).toEqual('/others')
    expect(query(fixture, 'app-others')).toBeDefined()
  }))
})
