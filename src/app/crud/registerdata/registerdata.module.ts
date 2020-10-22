import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterdataRoutingModule } from './registerdata-routing.module';
import { RegisterdataComponent } from './registerdata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceFirebaseService } from '../service/service-firebase.service'

@NgModule({
  declarations: [RegisterdataComponent],
  imports: [
    CommonModule,
    RegisterdataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[ ServiceFirebaseService]
})
export class RegisterdataModule { }
