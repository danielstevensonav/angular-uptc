import { TipoEjercicio } from "./TipoEjercicio";

export interface Ejercicio {
    id_ejercicio?: number
    nombre_ejercicio: string;
    dsc_ejercicio: string;
    tipoEjercicio: TipoEjercicio;
}