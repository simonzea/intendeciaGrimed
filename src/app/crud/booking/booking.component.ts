import { Component, OnInit, Inject } from '@angular/core';
import { ServiceFirebaseService } from '../service/service-firebase.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'bookingModal',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  unidades = [{ value: 'Cachorros' }, { value: 'Lobatos' },
   { value: 'Webelos' }, { value: 'Tropa' }, { value: 'Sociedad' },
    { value: 'Clan' }, { value: 'Consejo' }, { value: 'Jefatura Grupo' }];

  constructor(public firebaseService: ServiceFirebaseService,
              public matDialogRef: MatDialogRef<BookingComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }

  onSaveBooking(): void {
    this.firebaseService.editItem(this.firebaseService.itemSelected);
    this.close();
  }

  close(): void {
    this.matDialogRef.close();
  }
}
