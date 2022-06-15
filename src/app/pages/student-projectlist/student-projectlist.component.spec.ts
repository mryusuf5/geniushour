import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectlistComponent } from './student-projectlist.component';

describe('StudentProjectlistComponent', () => {
  let component: StudentProjectlistComponent;
  let fixture: ComponentFixture<StudentProjectlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProjectlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
