import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueProofComponent } from './issue-proof.component';

describe('IssueProofComponent', () => {
  let component: IssueProofComponent;
  let fixture: ComponentFixture<IssueProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
