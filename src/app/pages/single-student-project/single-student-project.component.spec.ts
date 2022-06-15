import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStudentProjectComponent } from './single-student-project.component';

describe('SingleStudentProjectComponent', () => {
  let component: SingleStudentProjectComponent;
  let fixture: ComponentFixture<SingleStudentProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStudentProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStudentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
