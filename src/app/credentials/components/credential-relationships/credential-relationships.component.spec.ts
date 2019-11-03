import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialRelationshipsComponent } from './issue-credential.component';

describe('IssueCredentialComponent', () => {
  let component: CredentialRelationshipsComponent;
  let fixture: ComponentFixture<CredentialRelationshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialRelationshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
