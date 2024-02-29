import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersComponent } from './others.component';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from 'src/app/directives/highlight.directive';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersComponent, HighlightDirective ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
