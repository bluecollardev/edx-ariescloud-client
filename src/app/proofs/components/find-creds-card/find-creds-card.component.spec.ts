import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCredsCardComponent } from './find-creds-card.component';

describe('FindCredsCardComponent', () => {
  let component: FindCredsCardComponent;
  let fixture: ComponentFixture<FindCredsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCredsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCredsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
