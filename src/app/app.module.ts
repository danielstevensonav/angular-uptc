import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TipoEjercicioComponent } from './modules/tipo-ejercicio/tipo-ejercicio.component';
import { EjercicioComponent } from './modules/ejercicio/ejercicio.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ParteCuerpoComponent } from './modules/parte-cuerpo/parte-cuerpo.component';
import { MusculoEjercicioComponent } from './modules/musculo-ejercicio/musculo-ejercicio.component';
import { EspecialistaComponent } from './modules/especialista/especialista.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { GrupoDeportivoComponent } from './modules/grupo-deportivo/grupo-deportivo.component';
import { RutinaComponent } from './modules/rutina/rutina.component';

@NgModule({
  declarations: [
    AppComponent,
    TipoEjercicioComponent,
    EjercicioComponent,
    NavbarComponent,
    ParteCuerpoComponent,
    MusculoEjercicioComponent,
    EspecialistaComponent,
    RegistroComponent,
    GrupoDeportivoComponent,
    RutinaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
