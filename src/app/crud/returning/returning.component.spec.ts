import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturningComponent } from './returning.component';

describe('ReturningComponent', () => {
  let component: ReturningComponent;
  let fixture: ComponentFixture<ReturningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
