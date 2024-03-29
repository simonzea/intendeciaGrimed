import { Action } from '@ngrx/store';
import { User } from '../models/user';

export enum AuthActionTypes {
    GET_USER = '[Auth] Get User',
    SET_USER = '[Auth] Set User',
    AUTHENTICATED = '[Auth] Authenticate',
    NOT_AUTHENTICATED = '[Auth] not Authenticate',
    LOGIN = '[Auth] Login',
    LOGOUT = '[Auth] Logout',
    AUTH_ERROR = '[Auth] Error',
}

export class GetUser implements Action {
    readonly type = AuthActionTypes.GET_USER;
    constructor(public payload?: any) { }
}

export class SetUser implements Action {
    readonly type = AuthActionTypes.SET_USER;
    constructor(public payload?: any) { }
}

export class Authenticated implements Action {
    readonly type = AuthActionTypes.AUTHENTICATED;
    constructor(public payload?: any) { }
}

export class NotAuthenticated implements Action {
    readonly type = AuthActionTypes.NOT_AUTHENTICATED;
    constructor(public payload?: any) { }
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload?: any) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
    constructor(public payload?: any) { }
}

export class AuthError implements Action {
    readonly type = AuthActionTypes.AUTH_ERROR;
    constructor(public payload?: any) { }
}

export type All 
= GetUser
|SetUser
|Authenticated
|NotAuthenticated
|AuthError
|Logout
|Login
