import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProjectEditComponent } from './single-project-edit.component';

describe('SingleProjectEditComponent', () => {
  let component: SingleProjectEditComponent;
  let fixture: ComponentFixture<SingleProjectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProjectEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
