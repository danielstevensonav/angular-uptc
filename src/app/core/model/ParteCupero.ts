export interface ParteCuerpo {
    id_musculo?: number
    dsc_musculo: string;
    aux: string;
    validate: boolean;
    parteCuerpoHijo: ParteCuerpo;
}