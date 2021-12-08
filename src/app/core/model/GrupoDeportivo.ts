import { Especialista } from "./Especialista";

export interface GrupoDeportivo {
    csc_intentos?: number;
    intento: number;
    aux: string;
    validate: boolean;
    especialista: Especialista;
    especialista2: Especialista;
}