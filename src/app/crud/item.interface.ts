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

  export enum comparaciones {
    igual = '=='
  }

  export enum ItemProperties {
    correo = 'correo',
    estado = 'estado'
  }

export const collectionItem = 'Items';

export interface ItemID extends ItemI { id : string};

export const columnsNames = ['nombre', 'estado',
'cantidad', 'unidad', 'condicion', 'agrupacion', 'fechaPrestamo', 'fechaEntrega', 'notas', 'actions']