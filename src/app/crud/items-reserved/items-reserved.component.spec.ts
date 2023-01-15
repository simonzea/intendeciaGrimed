import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsReservedTableComponent } from './items-reserved.component';

describe('ItemsTableComponent', () => {
  let component: ItemsReservedTableComponent;
  let fixture: ComponentFixture<ItemsReservedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsReservedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsReservedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
