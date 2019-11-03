import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialTypesComponent } from './credential-types.component';

describe('CredentialTypesComponent', () => {
  let component: CredentialTypesComponent;
  let fixture: ComponentFixture<CredentialTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
