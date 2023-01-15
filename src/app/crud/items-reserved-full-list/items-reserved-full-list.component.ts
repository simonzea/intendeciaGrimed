import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceFirebaseService } from '../service/service-firebase.service';
import { columnsNames, ItemID } from '../item.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component'
import { ReturningComponent } from '../returning/returning.component';


@Component({
  selector: 'app-items-table-reserved-full-list',
  templateUrl: './items-reserved-full-list.component.html',
  styleUrls: ['./items-reserved-full-list.component.scss']
})
export class ItemsReservedTableFullListComponent implements OnInit, AfterViewInit {

  constructor(private firebaseService: ServiceFirebaseService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.firebaseService.getItemsReservedByStatus().subscribe((res:ItemID[]) => this.dataSource.data = res)
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
