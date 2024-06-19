import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componenti/login/login.component';
import { MapComponent } from './componenti/map/map.component';import { ModalComponent } from './componenti/modal/modal.component';
import { Pagina404Component } from './componenti/pagina-404/pagina-404.component';
import { GestioneUtentiComponent } from './componenti/map/componenti-mappa/gestione-utenti/gestione-utenti.component';
import { PingEditorComponent } from './componenti/map/componenti-mappa/ping-editor/ping-editor.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalComponent,
    Pagina404Component,
    GestioneUtentiComponent,
    PingEditorComponent,
    MapComponent,
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    MatDividerModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    
  
    
    ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
