export interface IUser {
    uid:string;
    displayName:string;
    loading?: boolean;
    error?:string;
    correo: string;
    isAdmin: boolean;
}

export const admins = ['jefedegrupo@gruposcoutprimero.org', 'intendencia@gruposcoutprimero.org', 'me@me.com'];

export class User implements IUser {
    constructor(public uid: string, public displayName: string, public correo, public isAdmin){}
}