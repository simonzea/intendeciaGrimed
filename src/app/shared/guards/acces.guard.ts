import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AccessGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      this.authSvc.getCurrentUser().then(result => {
        if (!result) {
          this.router.navigate(['login']);
        } 
      });
    }
      return true;
    
  }

}
