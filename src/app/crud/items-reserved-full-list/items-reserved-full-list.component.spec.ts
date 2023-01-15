import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsReservedTableFullListComponent } from './items-reserved-full-list.component';

describe('ItemsTableComponent', () => {
  let component: ItemsReservedTableFullListComponent;
  let fixture: ComponentFixture<ItemsReservedTableFullListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsReservedTableFullListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsReservedTableFullListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
