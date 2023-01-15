import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Observable, of, from } from 'rxjs';
import * as userActions from '../actions/auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
export type Action = userActions.All;

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(private actions: Actions, private authSvc: AuthService) { }

    @Effect()
    getUser: Observable<Action> = this.actions.pipe(
        ofType(userActions.AuthActionTypes.GET_USER),
        map((action: userActions.GetUser) => action.payload),
        switchMap(payload => this.authSvc.getCurrentUser()),
        map(authData => {
            if (authData) {
                console.log(authData);
                const user = new User(authData.uid, authData.displayName, authData.email);
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
            console.log(payload+"login")
            return from(this.authSvc.login(payload.email, payload.password));
        }),
        map(() => {
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