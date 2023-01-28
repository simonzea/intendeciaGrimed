import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { admins, User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Observable, of, from } from 'rxjs';
import * as userActions from '../actions/auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
export type Action = userActions.All;

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(private actions: Actions, private authSvc: AuthService, private router:Router) { }

    @Effect()
    getUser: Observable<Action> = this.actions.pipe(
        ofType(userActions.AuthActionTypes.GET_USER),
        map((action: userActions.GetUser) => action.payload),
        switchMap(payload => this.authSvc.getCurrentUser()),
        map(authData => {
            if (authData) {
                const isAdmin = admins.includes(authData.email);
                const user = new User(authData.uid, authData.displayName, authData.email, isAdmin);
                return new userActions.Authenticated(user);
            } else {
                return new userActions.NotAuthenticated();
            }
        }),
        catchError(err => of(new userActions.AuthError()))
    );

    @Effect()
    login: Observable<Action> = this.actions.pipe(
        tap(x=> console.log(x)),
        ofType(userActions.AuthActionTypes.LOGIN),
        map((action: userActions.Login) => action.payload),
        switchMap(payload => {
            return from(this.authSvc.login(payload.email, payload.password));
        }),
        map(() => {
            this.router.navigate(['/home']);
            return new userActions.GetUser();
        }),
        catchError(err => {
            return of(new userActions.AuthError({ error: err.message }));
        })
    )

    @Effect()
    logout: Observable<Action> = this.actions.pipe(
        tap(x=> console.log(x)),
        ofType(userActions.AuthActionTypes.LOGOUT),
        tap(x=> console.log(x)),
        map((action: userActions.Logout) => action.payload),
        switchMap(payload => {
            console.log(payload+"logout")
            return of(this.authSvc.logout());
        }),
        map(() => {
            return new userActions.NotAuthenticated();
        }),
        catchError(err => {
            return of(new userActions.AuthError({ error: err.message }));
        })
    )
}