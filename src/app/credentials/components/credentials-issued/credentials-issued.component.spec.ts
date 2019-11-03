import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsIssuedComponent } from './issued-credentials.component';

describe('IssuedCredentialsComponent', () => {
  let component: CredentialsIssuedComponent;
  let fixture: ComponentFixture<CredentialsIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
