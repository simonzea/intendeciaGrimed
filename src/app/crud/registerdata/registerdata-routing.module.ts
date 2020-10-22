import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterdataComponent } from './registerdata.component';

const routes: Routes = [{ path: '', component: RegisterdataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterdataRoutingModule { }
