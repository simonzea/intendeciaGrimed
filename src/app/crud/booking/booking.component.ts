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
  lastItem: ItemID;

  constructor(public firebaseService: ServiceFirebaseService,
              public matDialogRef: MatDialogRef<BookingComponent>,
              public afAuth: AngularFireAuth,
              @Inject(MAT_DIALOG_DATA) data) { }
  

  ngOnInit(): void {
    this.lastItem = cloneDeep(this.firebaseService.itemSelected);
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
    let saveItem = this.setUltimosReservados(this.lastItem);
    saveItem = this.convinarItems(this.firebaseService.itemSelected, saveItem)
    saveItem = this.setCorreo(saveItem, this.correo);
    saveItem = this.setEstadoReservado(saveItem);
    saveItem = this.setFechaEntregaEmpty(saveItem);
    this.firebaseService.editItem(saveItem);
    this.close();
  }

  convinarItems(newitem: ItemID, oldItem: ItemID): ItemID{
    return{...oldItem,
    unidad: newitem.unidad,
    cantidad: newitem.cantidad,
    fechaEntrega: newitem.fechaPrestamo}
  }

  setUltimosReservados(item: ItemID): ItemID {
    let newItem = this.setCorreoUltimo(item, item.correo);
    newItem = this.setUnidadUltima(newItem, item.unidad);
    newItem = this.setFechaEntregaUltima(newItem, item.fechaEntrega);
    newItem = this.setFechaPrestamoUltima(newItem, item.fechaPrestamo);
    newItem = this.setNotaUltima(newItem, item.notas);
    return newItem;
  }

  setCorreoUltimo(item: ItemID, correo: string): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.correoUltimo = correo;
    return returnItem;
  }

  setNotaUltima(item: ItemID, nota: string): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.notasUltima = nota;
    return returnItem;
  }

  setUnidadUltima(item: ItemID, unidad: string): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.unidadUltima = unidad;
    return returnItem;
  }

  setFechaEntregaUltima(item: ItemID, fechaEntrega: number): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.fechaEntregaUltima = fechaEntrega;
    return returnItem;
  }

  setFechaPrestamoUltima(item: ItemID, fechaPrestamo: number): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.fechaPrestamoUltima = fechaPrestamo;
    return returnItem;
  }

  setCorreo(item: ItemID, correo: string): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.correo = correo;
    return returnItem;
  }

  setFechaEntregaEmpty(item: ItemID): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.fechaEntrega = '';
    return returnItem;
  }

  setEstadoReservado(item: ItemID): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.estado = estadosDelItem.reservado;
    return returnItem;
  }

  close(): void {
    this.matDialogRef.close();
  }
}
