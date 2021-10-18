import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceFirebaseService } from '../service/service-firebase.service';
import { ItemID } from '../item.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component'


@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit, AfterViewInit {

  constructor(private firebaseService: ServiceFirebaseService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.firebaseService.getAllItems().subscribe(res => this.dataSource.data = res)
  }

  displayedColumns: string[] = ['nombre', 'deUso', 'estado',
    'unidad', 'cantidad', 'fechaPrestamo', 'fechaEntrega', 'notas', 'actions'];

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

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Reservar'
    };
    dialogConfig.autoFocus = true;
    this.matDialog.open(BookingComponent, dialogConfig)
  }

}
