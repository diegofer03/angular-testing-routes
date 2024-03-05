import { ComponentFixture } from "@angular/core/testing";
import { query } from "./finders";

export function setInputValue<T>(fixture: ComponentFixture<T> ,selector:string, value: string) {
  const inputElem: HTMLInputElement = query(fixture, selector).nativeElement
  inputElem.value = value
  inputElem.dispatchEvent(new Event('input'))
  inputElem.dispatchEvent(new Event('blur'))
}

export function setCheckValue<T>(fixture: ComponentFixture<T> , selector: string, value:boolean) {
  const checkElem : HTMLInputElement = query(fixture, selector).nativeElement
  checkElem.checked = value
  checkElem.dispatchEvent(new Event('change'))
  checkElem.dispatchEvent(new Event('blur'))
}
