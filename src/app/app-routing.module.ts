import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuard } from '../app/shared/guards/acces.guard';
import { ItemsTableComponent } from './crud/items-table/items-table.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { requiresLogin: true }, canActivate: [AccessGuard]
  },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  {
    path: 'registerdata', loadChildren: () => import('./crud/registerdata/registerdata.module').then(m => m.RegisterdataModule),
    data: { requiresLogin: true }, canActivate: [AccessGuard]
  },
  {
    path: 'itemstable', component: ItemsTableComponent,
    data: { requiresLogin: true }, canActivate: [AccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
