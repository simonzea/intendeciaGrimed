import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ServiceFirebaseService } from '../service/service-firebase.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { estadosDelItem, ItemID } from '../item.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bookingModal',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy{

  unidades = [{ value: 'Cachorros' }, { value: 'Lobatos' },
   { value: 'Webelos' }, { value: 'Tropa' }, { value: 'Sociedad' },
    { value: 'Clan' }, { value: 'Consejo' }, { value: 'Jefatura Grupo' }];
  correo: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public firebaseService: ServiceFirebaseService,
              public matDialogRef: MatDialogRef<BookingComponent>,
              public afAuth: AngularFireAuth,
              @Inject(MAT_DIALOG_DATA) data) { }
  

  ngOnInit(): void {
    this.afAuth.authState.pipe(
      first(),
      tap(auth => this.correo = auth.email),
      takeUntil(this.destroy$)
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSaveBooking(): void {
    let saveItem = this.setCorreo(this.firebaseService.itemSelected, this.correo);
    saveItem = this.setEstado(saveItem);
    saveItem = this.setFechaEntrega(saveItem);
    this.firebaseService.editItem(saveItem);
    this.close();
  }

  setCorreo(item: ItemID, correo: string): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.correo = correo;
    return returnItem;
  }

  setFechaEntrega(item: ItemID): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.fechaEntrega = '';
    return returnItem;
  }

  setEstado(item: ItemID): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.estado = estadosDelItem.reservado;
    return returnItem;
  }

  close(): void {
    this.matDialogRef.close();
  }
}
