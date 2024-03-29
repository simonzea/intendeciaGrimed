import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/services/auth.service';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers/reducer';
import { ItemsTableComponent } from './crud/items-table/items-table.component';
import { ItemsReservedTableComponent } from './crud/items-reserved/items-reserved.component';
import { ItemsReservedTableFullListComponent } from './crud/items-reserved-full-list/items-reserved-full-list.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingComponent } from './crud/booking/booking.component';
import { ReturningComponent } from './crud/returning/returning.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { UserEffects } from './auth/effects/auth.effects';

const NGRX_IMPORTS = [
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  EffectsModule.forRoot([UserEffects]),
  StoreDevtoolsModule.instrument({
    name: 'intendeciaGr1med',
    logOnly: environment.production
  })
];

const FIRE_MODULES = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFirestoreModule
];

const MATERIAL_MODULES = [
  BrowserAnimationsModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatDialogModule
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsTableComponent,
    ItemsReservedTableComponent,
    ItemsReservedTableFullListComponent,
    FirestoreDatePipe,
    BookingComponent,
    ReturningComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...FIRE_MODULES,
    ...NGRX_IMPORTS,
    ...MATERIAL_MODULES
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
