import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRelationshipComponent } from './approve-relationship.component';

describe('ViewRelationshipComponent', () => {
  let component: ApproveRelationshipComponent;
  let fixture: ComponentFixture<ApproveRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
