import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemStackedComponent } from './list-item-stacked.component';

describe('ListItemStackedComponent', () => {
  let component: ListItemStackedComponent;
  let fixture: ComponentFixture<ListItemStackedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemStackedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
