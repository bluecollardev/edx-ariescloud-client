import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCredentialComponent } from './issue-credential.component';

describe('IssueCredentialComponent', () => {
  let component: IssueCredentialComponent;
  let fixture: ComponentFixture<IssueCredentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCredentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
