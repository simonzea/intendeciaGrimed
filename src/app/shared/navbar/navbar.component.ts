import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as userActions from '../../auth/actions/auth.actions';
import * as fromReducer from '../../reducers/reducer';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})

export class NavbarComponent implements OnInit{
  public isLogged = false;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public isAdmin$: Observable<boolean> ;
  constructor(private authSvc: AuthService, private router: Router, private store: Store<fromReducer.State>) { }

  ngOnInit(): void {
    this.isAdmin$ = this.store.pipe(
      select(fromReducer.getAuth),
      filter(user => !!user?.uid),
      map(user => user?.isAdmin),
      tap(console.log)
    );
  }

  async onLogout() {
    try {
      this.store.dispatch( new userActions.Logout())
      this.router.navigate(['/login'])
    } catch (err) {
      console.log(err);
    }
  }

  onRedirect(menu: string) {
    this.router.navigate([`/${menu}`]);
  }

}
