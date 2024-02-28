import { Component, DebugElement, ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h5 class="title" highlight>default</h5>
    <h5 highlight="yellow">yellow</h5>
    <p highlight="blue">parrafo</p>
    <p>otro parrafo</p>
  `
})export class HostComponent {

}

fdescribe('HighlightDirective', () => {
  let component : HostComponent
  let fixture : ComponentFixture<HostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective]
    }).compileComponents()

    fixture = TestBed.createComponent(HostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be 3 elements with highlight', () => {
    // let elementRef : DebugElement[] = fixture.debugElement.queryAll(By.css('*:[highligth]'))
    let elementRef : DebugElement[] = fixture.debugElement.queryAll(By.directive(HighlightDirective))
    let elementWithOutRef :  DebugElement [] = fixture.debugElement.queryAll(By.css('*:not([highlight])'))
    console.log(elementRef)
    expect(elementRef.length).toEqual(3)
    expect(elementWithOutRef.length).toEqual(1)
  })

  it('should the elements be match with bgColor', () => {
    let elementRef : ElementRef[] = fixture.debugElement.queryAll(By.directive(HighlightDirective))
    expect(elementRef[0].nativeElement.style.backgroundColor).toEqual('gray')
    expect(elementRef[1].nativeElement.style.backgroundColor).toEqual('yellow')
    expect(elementRef[2].nativeElement.style.backgroundColor).toEqual('blue')
  })

  it('should match deafult background color', () => {
    let elementRef : DebugElement = fixture.debugElement.query(By.css('.title'))
    const dir = elementRef.injector.get(HighlightDirective)
    expect(elementRef.nativeElement.style.backgroundColor).toEqual(dir.defaultColor)
  })

});
