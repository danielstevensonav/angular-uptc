import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioComponent } from './modules/ejercicio/ejercicio.component';
import { TipoEjercicioComponent } from './modules/tipo-ejercicio/tipo-ejercicio.component';

const routes: Routes = [
  {path: 'tipo-ejercicio', component: TipoEjercicioComponent},
  {path: 'ejercicio', component: EjercicioComponent},
  {path: '**', component: TipoEjercicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
