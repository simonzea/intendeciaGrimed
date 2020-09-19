import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as userActions from '../actions/auth.actions';
import * as fromReducer from '../../reducers/reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  user:any;

  constructor(private authSvc: AuthService, private router:Router, private store: Store<fromReducer.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new userActions.GetUser());
    this.user = this.store.pipe(select(fromReducer.getAuth))
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
      this.store.dispatch( new userActions.Login(this.loginForm.value))
      if(this.user) {
        this.router.navigate(['/home'])
      }
  }

  onLogout() {
    this.store.dispatch( new userActions.Logout())
  }

}
