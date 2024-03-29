import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer
} from '@ngrx/store';

import { RouterStateUrl } from '../shared/utils';

import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAuth from '../auth/reducers/auth.reducer';
import { environment } from 'src/environments/environment';

export interface State {
    auth: fromRouter.StateKeyOrSelector,
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State | any> = {
    auth: fromAuth.UserReducer,
    router: fromRouter.routerReducer
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getAuth = createSelector(
    getAuthState,
    fromAuth.getAuthState
)
