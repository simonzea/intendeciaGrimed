import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceFirebaseService } from '../service/service-firebase.service';
import { columnsNames, ItemID } from '../item.interface';
import { select, Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as fromReducer from '../../reducers/reducer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReturningComponent } from '../returning/returning.component';


@Component({
  selector: 'app-items-table-reserved',
  templateUrl: './items-reserved.component.html',
  styleUrls: ['./items-reserved.component.scss']
})
export class ItemsReservedTableComponent implements OnInit, AfterViewInit {

  constructor(private firebaseService: ServiceFirebaseService,
              private store: Store,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.store.pipe(
      select(fromReducer.getAuth),
      filter(user => !!user?.uid),
      switchMap(user => this.firebaseService.getItemsReservedByEmail(user.correo)),
      tap((res:ItemID[]) => this.dataSource.data = res)
    ).subscribe();
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

  onUndo(element) {
    this.openModal();
    this.firebaseService.itemSelected = element;
   }


  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Regresar item'
    };
    dialogConfig.autoFocus = true;
    this.matDialog.open(ReturningComponent, dialogConfig)
  }

}
