import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingCredentialComponent } from './view-pending-credential.component';

describe('ViewPendingCredentialComponent', () => {
  let component: ViewPendingCredentialComponent;
  let fixture: ComponentFixture<ViewPendingCredentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingCredentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
