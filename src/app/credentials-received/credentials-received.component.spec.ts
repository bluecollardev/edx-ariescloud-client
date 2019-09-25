import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsReceivedComponent } from './credentials-received.component';

describe('CredentialsComponent', () => {
  let component: CredentialsReceivedComponent;
  let fixture: ComponentFixture<CredentialsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
