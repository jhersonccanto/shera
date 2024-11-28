import { RepresentanteLegal } from "./representante-legal";


export class Empresa{
  id_empresa: number = 0;
  razon_social: string = '';
  ruc: number = 0;
  email: string = '';
  telefono: number = 0;
  direccion: string = '';
  estado: string = '';
  representante: RepresentanteLegal = new RepresentanteLegal();
 
    
    constructor(
        id_empresa: number = 0,
        razon_social: string = '',
        ruc: number = 0,
        email: string = '',
        telefono: number = 0,
        direccion: string ='',
        estado: string ='',
        representante: RepresentanteLegal = new RepresentanteLegal(),
      
      ) {
        this.id_empresa = id_empresa;
        this.razon_social = razon_social;
        this.ruc = ruc;
        this.email = email;
        this.telefono = telefono;
        this.direccion=direccion;
        this.estado=estado;
        this.representante = representante;
    
      }
}
