import { Component, DebugElement, ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { query, queryAll, queryAllByDirective } from '@testing';

@Component({
  template: `
    <h5 class="title" highlight>default</h5>
    <h5 highlight="yellow">yellow</h5>
    <p highlight="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [highlight]="color">
  `
})export class HostComponent {
  color = 'blue'
}

describe('HighlightDirective', () => {
  let component : HostComponent
  let fixture : ComponentFixture<HostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
      imports: [ FormsModule ]
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
    // let elementRef : DebugElement[] = fixture.debugElement.queryAll(By.directive(HighlightDirective))
    // let elementWithOutRef :  DebugElement [] = fixture.debugElement.queryAll(By.css('*:not([highlight])'))
    let elementRef : DebugElement[] = queryAllByDirective(fixture, HighlightDirective)
    let elementWithOutRef: DebugElement[] = queryAll(fixture, '*:not([highlight])')
    expect(elementRef.length).toEqual(4)
    expect(elementWithOutRef.length).toEqual(2)
  })

  it('should the elements be match with bgColor', () => {
    let elementRef : DebugElement[] = queryAllByDirective(fixture, HighlightDirective)
    expect(elementRef[0].nativeElement.style.backgroundColor).toEqual('gray')
    expect(elementRef[1].nativeElement.style.backgroundColor).toEqual('yellow')
    expect(elementRef[2].nativeElement.style.backgroundColor).toEqual('blue')
  })

  it('should match deafult background color', () => {
    let elementRef : DebugElement = query(fixture, '.title')
    const dir = elementRef.injector.get(HighlightDirective)
    expect(elementRef.nativeElement.style.backgroundColor).toEqual(dir.defaultColor)
  })

  it('should bind <input> and change the bgColor', () => {
    const inputDe = query(fixture, 'input')
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    expect(inputEl.style.backgroundColor).toEqual('blue');

    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});
