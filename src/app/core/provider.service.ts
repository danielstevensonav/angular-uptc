import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejercicio } from './model/Ejercicio';
import { Especialista } from './model/Especialista';
import { GrupoDeportivo } from './model/GrupoDeportivo';
import { MusculoEjercicio } from './model/MusculoEjercicio';
import { ParteCuerpo } from './model/ParteCupero';
import { Registro } from './model/Registro';
import { TipoEjercicio } from './model/TipoEjercicio';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private url = "https://nest-api-persistence.herokuapp.com"; // URL to web api

  constructor(private http: HttpClient) {}

  // Tipo Ejercicio
  public postTipoEjercicio(tipoEjercicio: TipoEjercicio): Observable<TipoEjercicio> {
    return this.http.post<TipoEjercicio>(`${this.url}/tipo-ejercicio`, tipoEjercicio);
  }

  public getListTipoEjercicio(): Observable<TipoEjercicio[]> {
    return this.http.get<TipoEjercicio[]>(`${this.url}/tipo-ejercicio/list`);
  }

  public putTipoEjercicio(id: number, tipoEjercicio: TipoEjercicio): Observable<TipoEjercicio> {
    return this.http.put<TipoEjercicio>(`${this.url}/tipo-ejercicio/${id}`, tipoEjercicio);
  }

  public deleteTipoEjercicio(id: number): Observable<TipoEjercicio> {
    return this.http.delete<TipoEjercicio>(`${this.url}/tipo-ejercicio/${id}`);
  }

  // Ejercicio
  public postEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(`${this.url}/ejercicio`, ejercicio);
  }

  public getListEjercicio(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(`${this.url}/ejercicio/list`);
  }

  public putEjercicio(id: number, ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.put<Ejercicio>(`${this.url}/ejercicio/${id}`, ejercicio);
  }

  public deleteEjercicio(id: number): Observable<Ejercicio> {
    return this.http.delete<Ejercicio>(`${this.url}/ejercicio/${id}`);
  }

  // ParteCupero
  public postParteCuerpo(parteCuerpo: ParteCuerpo): Observable<ParteCuerpo> {
    return this.http.post<ParteCuerpo>(`${this.url}/parte-cuerpo`, parteCuerpo);
  }

  public getListParteCuerpo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/parte-cuerpo/list`);
  }

  public putParteCuerpo(id: number, parteCuerpo: ParteCuerpo): Observable<ParteCuerpo> {
    return this.http.put<ParteCuerpo>(`${this.url}/parte-cuerpo/${id}`, parteCuerpo);
  }

  public deleteParteCuerpo(id: number): Observable<ParteCuerpo> {
    return this.http.delete<ParteCuerpo>(`${this.url}/parte-cuerpo/${id}`);
  }

  // MusculoEjercicio
  public postMusculoEjercicio(musculoEjercicio: MusculoEjercicio): Observable<MusculoEjercicio> {
    return this.http.post<MusculoEjercicio>(`${this.url}/musculo-ejercicio`, musculoEjercicio);
  }

  public getListMusculoEjercicio(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/musculo-ejercicio/list`);
  }

  public deleteMusculoEjercicio(musculoEjercicio: any): any {
    console.log(musculoEjercicio);
    return this.http.delete<any>(`${this.url}/musculo-ejercicio`, musculoEjercicio);
  }

  // Especialista
  public postEspecialista(especialista: Especialista): Observable<Especialista> {
    return this.http.post<Especialista>(`${this.url}/especialista`, especialista);
  }

  public getListEspecialista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/especialista/list`);
  }

  public putEspecialista(id: number, especialista: Especialista): Observable<Especialista> {
    return this.http.put<Especialista>(`${this.url}/especialista/${id}`, especialista);
  }

  public deleteEspecialista(id: number): Observable<Especialista> {
    return this.http.delete<Especialista>(`${this.url}/especialista/${id}`);
  }

  // Registro
  public postRegistro(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(`${this.url}/registro`, registro);
  }

  public getListRegistro(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/registro/list`);
  }

  public putRegistro(id: number, registro: Registro): Observable<Registro> {
    return this.http.put<Registro>(`${this.url}/registro/${id}`, registro);
  }

  public deleteRegistro(id: number): Observable<Registro> {
    return this.http.delete<Registro>(`${this.url}/registro/${id}`);
  }

  // GrupoDeportivo
  public postGrupoDeportivo(grupoDeportivo: GrupoDeportivo): Observable<GrupoDeportivo> {
    return this.http.post<GrupoDeportivo>(`${this.url}/grupo-deportivo`, grupoDeportivo);
  }

  public getListGrupoDeportivo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/grupo-deportivo/list`);
  }

  public putGrupoDeportivo(id: number, grupoDeportivo: GrupoDeportivo): Observable<GrupoDeportivo> {
    return this.http.put<GrupoDeportivo>(`${this.url}/grupo-deportivo/${id}`, grupoDeportivo);
  }

  public deleteGrupoDeportivo(id: number): Observable<GrupoDeportivo> {
    return this.http.delete<GrupoDeportivo>(`${this.url}/grupo-deportivo/${id}`);
  }
}
