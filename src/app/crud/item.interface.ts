export interface ItemI {
    nombreItem: string;
    unidad: string;
    deUso: boolean;
    estado: string;
    cantidad: number;
    notas: string;
    fechaPrestamo: number;
    fechaEntrega: number;
}

export interface ItemID extends ItemI { id : string};