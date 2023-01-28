import * as userActions from '../actions/auth.actions';


export type Action = userActions.All;

export interface State {
    uid: string;
    displayName: string;
    loading?: boolean;
    error?: string;
    correo?: string;
    isAdmin?: boolean;
}

export function UserReducer(state: State, action: Action) {
    console.log(action);
    switch (action.type) {
        case userActions.AuthActionTypes.GET_USER:
            return { ...state, loading: true }
        case userActions.AuthActionTypes.SET_USER:
            return { ...state, ...action.payload, loading: true }
        case userActions.AuthActionTypes.AUTHENTICATED:
            return { ...state, ...action.payload, loading: true }
        case userActions.AuthActionTypes.NOT_AUTHENTICATED:
            return { }
        case userActions.AuthActionTypes.LOGIN:
            return { ...state, loading: true }
        case userActions.AuthActionTypes.AUTH_ERROR:
            return { ...state, ...action.payload, loading: false }
        case userActions.AuthActionTypes.LOGOUT:
            return { }
    }
}

export const getAuthState = (state: State) => state;