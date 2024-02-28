import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  element = inject(ElementRef)
  defaultColor = 'gray'
  @Input('highlight') color = ''

  constructor() {
    this.element.nativeElement.style.backgroundColor = this.defaultColor
  }

  ngOnChanges(){
    this.element.nativeElement.style.backgroundColor = this.color || this.defaultColor;
  }

}
