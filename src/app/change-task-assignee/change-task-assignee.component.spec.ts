import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTaskAssigneeComponent } from './change-task-assignee.component';

describe('ChangeTaskAssigneeComponent', () => {
  let component: ChangeTaskAssigneeComponent;
  let fixture: ComponentFixture<ChangeTaskAssigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTaskAssigneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTaskAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
