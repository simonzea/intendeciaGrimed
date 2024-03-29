import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { condicionDelItem, estadosDelItem } from '../item.interface';
import { ServiceFirebaseService } from '../service/service-firebase.service'

@Component({
  selector: 'app-registerdata',
  templateUrl: './registerdata.component.html',
  styleUrls: ['./registerdata.component.scss']
})
export class RegisterdataComponent implements OnInit {

  constructor(public fb: FormBuilder, public firebaseService: ServiceFirebaseService) { }

  itemsCreateForm = this.fb.group({
    nombreItem: [],
    unidad: [],
    unidadUltima: [],
    deUso: [],
    dePrestamo: [],
    estado: [estadosDelItem.disponible],
    correo: [],
    correoUltimo: [],
    condicion: [condicionDelItem.bueno],
    agrupacion: [],
    cantidad: [],
    notas: [],
    notasUltima: [],
    fechaPrestamo: [],
    fechaEntrega: [],
    fechaPrestamoUltima: [],
    fechaEntregaUltima: []
  });


  ngOnInit() {
  }

  onSubmit() {
    //required submit operation
    this.firebaseService.createItem(this.itemsCreateForm.value).then(res => {
      alert("El objeto fue guardado")
    }).catch(err => {
      console.log(err);
    });
  }

}
