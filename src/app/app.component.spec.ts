import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterLinkDirectiveStub, queryAllByDirective } from '@testing';

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component : AppComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should exist 7 routerlinks directives', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub)
    expect(links.length).toEqual(7)
  })

  it('should go to correct link', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub)
    const routes = links.map(rt => rt.injector.get(RouterLinkDirectiveStub))

    expect(routes.length).toEqual(7)
    expect(routes[0].linkParams).toEqual('/')
    expect(routes[6].linkParams).toEqual('/others')
  })

  // it(`should have as title 'ng-testing-services'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('ng-testing-services');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('ng-testing-services app is running!');
  // });
});
