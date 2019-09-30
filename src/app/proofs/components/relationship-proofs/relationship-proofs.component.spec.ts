import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipProofsComponent } from './relationship-proofs.component';

describe('CredentialsComponent', () => {
  let component: RelationshipProofsComponent;
  let fixture: ComponentFixture<RelationshipProofsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipProofsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipProofsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
