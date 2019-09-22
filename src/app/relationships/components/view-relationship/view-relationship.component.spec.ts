import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRelationshipComponent } from './view-relationship.component';

describe('ViewRelationshipComponent', () => {
  let component: ViewRelationshipComponent;
  let fixture: ComponentFixture<ViewRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
