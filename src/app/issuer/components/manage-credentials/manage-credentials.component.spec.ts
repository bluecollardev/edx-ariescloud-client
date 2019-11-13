import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCredentialsComponent } from './manage-credentials.component';

describe('ManageCredentialsComponent', () => {
  let component: ManageCredentialsComponent;
  let fixture: ComponentFixture<ManageCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
