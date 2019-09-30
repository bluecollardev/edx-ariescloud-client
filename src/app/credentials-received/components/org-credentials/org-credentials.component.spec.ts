import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCredentialsComponent } from './org-credentials.component';

describe('CredentialsComponent', () => {
  let component: OrgCredentialsComponent;
  let fixture: ComponentFixture<OrgCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
