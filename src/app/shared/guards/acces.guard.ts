import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import * as userActions from '../../auth/actions/auth.actions';
import { User } from 'src/app/auth/models/user';
import * as fromReducer from '../../reducers/reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class AccessGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router, private store: Store<fromReducer.State>) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      this.authSvc.getCurrentUser().then(result => {
        if (!result) {
          this.router.navigate(['login']);
          return false;
        }
        // encontrar un mejor lugar para esto mirar mejor ngrx
        const user = new User(result.uid, result.displayName, result.email);
       this.store.dispatch(new userActions.SetUser(user));
      });
    }
      return true;
    
  }

}
