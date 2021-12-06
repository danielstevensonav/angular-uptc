import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejercicio } from './model/Ejercicio';
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
}
