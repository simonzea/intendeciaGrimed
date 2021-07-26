import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as userActions from '../../auth/actions/auth.actions';
import * as fromReducer from '../../reducers/reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})

export class NavbarComponent {
  public isLogged = false;
  public user: any;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService, private router: Router, private store: Store<fromReducer.State>) { }


  async onLogout() {
    try {
      this.store.dispatch( new userActions.Logout())
      this.router.navigate(['/login'])
    } catch (err) {
      console.log(err);
    }
  }

}
