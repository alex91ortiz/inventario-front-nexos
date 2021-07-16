import { Usuario } from "./Usuario";

export interface Mercancia {
    id?:number,
    nombreproducto?: string,
    cantidad?: number,
    fechaingreso?: Date,
    usuarioingreso?:Usuario,
    fechaactualizacion?:Date,
    usuarioactual?:Usuario
}