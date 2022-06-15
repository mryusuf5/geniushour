import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStudentProjectTeacherComponent } from './single-student-project-teacher.component';

describe('SingleStudentProjectTeacherComponent', () => {
  let component: SingleStudentProjectTeacherComponent;
  let fixture: ComponentFixture<SingleStudentProjectTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStudentProjectTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStudentProjectTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
