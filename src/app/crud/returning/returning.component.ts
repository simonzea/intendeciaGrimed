import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ServiceFirebaseService } from '../service/service-firebase.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { estadosDelItem, ItemID } from '../item.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'returningModal',
  templateUrl: './returning.component.html',
  styleUrls: ['./returning.component.scss']
})
export class ReturningComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public firebaseService: ServiceFirebaseService,
              public matDialogRef: MatDialogRef<ReturningComponent>,
              public afAuth: AngularFireAuth,
              @Inject(MAT_DIALOG_DATA) data) { }
  

  onSaveReturning(): void {
    let saveItem = this.setEstado(this.firebaseService.itemSelected);
    this.firebaseService.editItem(saveItem);
    this.close();
  }

  setEstado(item: ItemID): ItemID {
    let returnItem = cloneDeep(item);
    returnItem.estado = estadosDelItem.disponible;
    return returnItem;
  }

  close(): void {
    this.matDialogRef.close();
  }
}
