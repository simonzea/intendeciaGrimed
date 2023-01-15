import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { collectionItem, comparaciones, condicionDelItem, estadosDelItem, ItemI, ItemID, ItemProperties } from '../item.interface';
import * as fromReducer from '../../reducers/reducer';



@Injectable({
  providedIn: 'root'
})
export class ServiceFirebaseService {

  private itemCollection: AngularFirestoreCollection<ItemID>;
  items: Observable<ItemID[]>;
  public itemSelected = {
    id: null,
    cantidadReserva: 0,
    nombreItem: '',
    unidad: '',
    deUso: false,
    dePrestamo: true,
    condicion: condicionDelItem.bueno,
    agrupacion: '',
    correo: '',
    estado: estadosDelItem.disponible,
    cantidad: 0,
    notas: '',
    fechaPrestamo: null,
    fechaEntrega: null
  };
  correo: string;

  constructor(public fireService: AngularFirestore, private store: Store<fromReducer.State>) {
    this.itemCollection = fireService.collection<ItemID>(collectionItem);
    this.items = this.itemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ItemID;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    )
  }

  createItem(item) {
    return this.itemCollection.add(item)
  }

  getAllItems() {
    return this.items;
  }

  getItemsReservedByEmail(correo: string) {
    return this.fireService.collection(collectionItem, ref => ref.where(ItemProperties.correo, comparaciones.igual, correo).where(ItemProperties.estado, comparaciones.igual, estadosDelItem.reservado)).valueChanges()
  };

  getItemsReservedByStatus() {
    return this.fireService.collection(collectionItem, ref => ref.where(ItemProperties.estado, comparaciones.igual, estadosDelItem.reservado)).valueChanges()
  };

  editItem(item: ItemID) {
    let id = item.id;
    return this.itemCollection.doc(id).update(item);
  }

  deleteCustomer(id: string) {
    return this.itemCollection.doc(id).delete();
  }
}
