import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuerPage } from './issuer.page';

describe('IssuerPage', () => {
  let component: IssuerPage;
  let fixture: ComponentFixture<IssuerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
