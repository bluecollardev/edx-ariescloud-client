import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCredentialComponent } from './edit-credential.component';

describe('EditCredentialComponent', () => {
  let component: EditCredentialComponent;
  let fixture: ComponentFixture<EditCredentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCredentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
