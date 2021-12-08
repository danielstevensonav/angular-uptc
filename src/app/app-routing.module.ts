import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioComponent } from './modules/ejercicio/ejercicio.component';
import { EspecialistaComponent } from './modules/especialista/especialista.component';
import { GrupoDeportivoComponent } from './modules/grupo-deportivo/grupo-deportivo.component';
import { MusculoEjercicioComponent } from './modules/musculo-ejercicio/musculo-ejercicio.component';
import { ParteCuerpoComponent } from './modules/parte-cuerpo/parte-cuerpo.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { TipoEjercicioComponent } from './modules/tipo-ejercicio/tipo-ejercicio.component';

const routes: Routes = [
  {path: 'tipo-ejercicio', component: TipoEjercicioComponent},
  {path: 'ejercicio', component: EjercicioComponent},
  {path: 'parte-cuerpo', component: ParteCuerpoComponent},
  {path: 'musculo-ejercicio', component: MusculoEjercicioComponent},
  {path: 'especialista', component: EspecialistaComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'grupo-deportivo', component: GrupoDeportivoComponent},
  {path: '**', component: TipoEjercicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
