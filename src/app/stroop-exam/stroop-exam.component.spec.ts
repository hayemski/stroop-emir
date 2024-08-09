import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StroopExamComponent } from './stroop-exam.component';

describe('StroopExamComponent', () => {
  let component: StroopExamComponent;
  let fixture: ComponentFixture<StroopExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StroopExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StroopExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
