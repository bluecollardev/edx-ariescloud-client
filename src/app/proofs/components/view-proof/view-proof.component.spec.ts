import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProofComponent } from './view-proof.component';

describe('ViewCredentialComponent', () => {
  let component: ViewProofComponent;
  let fixture: ComponentFixture<ViewProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
