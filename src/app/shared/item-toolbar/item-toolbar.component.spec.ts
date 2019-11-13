import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemToolbarComponent } from './item-toolbar.component';

describe('ItemToolbarComponent', () => {
  let component: ItemToolbarComponent;
  let fixture: ComponentFixture<ItemToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
