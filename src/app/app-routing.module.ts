import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuard } from '../app/shared/guards/acces.guard';
import { AdminGuard } from '../app/shared/guards/admin.guard';
import { ItemsReservedTableFullListComponent } from './crud/items-reserved-full-list/items-reserved-full-list.component';
import { ItemsReservedTableComponent } from './crud/items-reserved/items-reserved.component';
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
    data: { requiresLogin: true }, canActivate: [AccessGuard,AdminGuard]
  },
  {
    path: 'itemstable', component: ItemsTableComponent,
    data: { requiresLogin: true }, canActivate: [AccessGuard]
  },
  {
    path: 'itemsreserved', component: ItemsReservedTableComponent,
    data: { requiresLogin: true }, canActivate: [AccessGuard]
  },
  {
    path: 'itemsreservedfull', component: ItemsReservedTableFullListComponent,
    data: { requiresLogin: true }, canActivate: [AccessGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
