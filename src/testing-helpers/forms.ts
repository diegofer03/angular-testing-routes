import { ComponentFixture } from "@angular/core/testing";
import { query } from "./finders";

export function setInputValue<T>(fixture: ComponentFixture<T> ,selector:string, value: string) {
  const inputElem: HTMLInputElement = query(fixture, selector).nativeElement
  inputElem.value = value
  inputElem.dispatchEvent(new Event('input'))
  inputElem.dispatchEvent(new Event('blur'))
}
