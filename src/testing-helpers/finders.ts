import { DebugElement, Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function getText<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElem = query(fixture, selector)
  const elem : HTMLElement = debugElem.nativeElement
  return elem.textContent
}

export function clickEvent<T>(fixture: ComponentFixture<T>, selector: string, event: unknown = null) {
  const debugElem: DebugElement = query(fixture, selector)
  debugElem.triggerEventHandler('click', event)
}

export function clickElemnt<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElem: DebugElement = query(fixture, selector)
  const elem : HTMLElement = debugElem.nativeElement
  elem.click()
}

export function query<T>(fixture: ComponentFixture<T>, selector: string){
  const debugElem : DebugElement = fixture.debugElement.query(By.css(selector))
  if(!debugElem){
    throw new Error(`couldn't find any element for ${selector} selector`)
  }
  return debugElem
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string){
  return fixture.debugElement.queryAll(By.css(selector))
}

export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive: Type<D>) {
  return fixture.debugElement.queryAll(By.directive(directive))
}
