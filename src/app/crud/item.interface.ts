export interface ItemI {
    nombreItem: string;
    unidad: string;
    unidadUltima: string;
    deUso: boolean;
    dePrestamo: boolean;
    condicion: condicionDelItem;
    agrupacion: string;
    estado: estadosDelItem;
    correo: string;
    correoUltimo: string;
    cantidad: number;
    cantidadReserva: number;
    notas: string;
    notasUltima: string;
    fechaPrestamo: number;
    fechaEntrega: number;
    fechaPrestamoUltima: number;
    fechaEntregaUltima: number;
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
'cantidad', 'unidad', 'condicion', 'agrupacion', 'fechaPrestamo', 'fechaEntrega','correo', 'notas', 'actions']