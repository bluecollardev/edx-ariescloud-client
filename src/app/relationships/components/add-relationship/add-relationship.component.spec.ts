import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationshipComponent } from './add-relationship.component';

describe('AddRelationshipComponent', () => {
  let component: AddRelationshipComponent;
  let fixture: ComponentFixture<AddRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
