import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemI, ItemID } from '../item.interface';



@Injectable({
  providedIn: 'root'
})
export class ServiceFirebaseService {

  private itemCollection: AngularFirestoreCollection<ItemID>;
  items: Observable<ItemID[]>;

  constructor(public fireService: AngularFirestore) {
    this.itemCollection = fireService.collection<ItemID>('Items');
    this.items = this.itemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ItemID;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    )
  }

  createItem(item) {
    return this.fireService.collection('Items').add(item)
  }

  getAllItems() {
    return this.items;
  }

  editItem(item: ItemID) {
    let id = item.id;
    return this.itemCollection.doc(id).update(item);
  }

  deleteCustomer(id: string) {
    return this.itemCollection.doc(id).delete();
  }
}
