import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipMessagesComponent } from './relationship-messages.component';

describe('RelationshipMessagesComponent', () => {
  let component: RelationshipMessagesComponent;
  let fixture: ComponentFixture<RelationshipMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
