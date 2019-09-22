import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelationshipComponent } from './edit-relationship.component';

describe('EditRelationshipComponent', () => {
  let component: EditRelationshipComponent;
  let fixture: ComponentFixture<EditRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
