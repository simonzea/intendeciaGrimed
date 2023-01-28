import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceFirebaseService } from '../service/service-firebase.service';
import { columnsNames, ItemID } from '../item.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { cloneDeep } from 'lodash';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import * as fromReducer from '../../reducers/reducer';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit, AfterViewInit {
  public isAdmin$: Observable<boolean> ;

  constructor(private firebaseService: ServiceFirebaseService,
              private matDialog: MatDialog,
              private store: Store) { }

  ngOnInit(): void {
    this.firebaseService.getAllItems().subscribe(res => this.dataSource.data = res);
    this.isAdmin$ = this.store.pipe(
        select(fromReducer.getAuth),
        filter(user => !!user?.uid),
        map(user => user?.isAdmin)
      );
  }

  displayedColumns: string[] = columnsNames;

  dataSource = new MatTableDataSource<ItemID>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element) {
    this.openModal();
    this.firebaseService.itemSelected = element;
   }

  onDelete(id: string) { 
    this.firebaseService.deleteCustomer(id);
  }

  onAvilable(element) {
    let saveItem = this.setDePrestamo(element)
    this.firebaseService.editItem(saveItem);
  }

  setDePrestamo(item: ItemID): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.dePrestamo = !returnItem.dePrestamo;
    return returnItem;
  }

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Reservar'
    };
    dialogConfig.autoFocus = true;
    this.matDialog.open(BookingComponent, dialogConfig)
  }

}
