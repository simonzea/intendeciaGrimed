export interface ItemI {
    nombreItem: string;
    unidad: string;
    deUso: boolean;
    condicion: condicionDelItem;
    agrupacion: string;
    estado: estadosDelItem;
    correo: string;
    cantidad: number;
    cantidadReserva: number;
    notas: string;
    fechaPrestamo: number;
    fechaEntrega: number;
}

export enum estadosDelItem {
    reservado = 'RESERVADO',
    disponible = 'DISPONIBLE',
    aprovado = 'APROVADO'
  }

export enum condicionDelItem {
    bueno = 'BUENO',
    regular = 'REGULAR',
    malo = 'MALO'
  }

export interface ItemID extends ItemI { id : string};