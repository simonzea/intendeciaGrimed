import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects'
import * as fromAuthReducer from '../reducers/auth.reducer';
import { UserEffects } from '../effects/auth.effects';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('login', fromAuthReducer.UserReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class LoginModule { }
