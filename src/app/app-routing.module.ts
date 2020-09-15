import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuard } from '../app/shared/guards/acces.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  data: { requiresLogin: true }, canActivate: [AccessGuard] },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
