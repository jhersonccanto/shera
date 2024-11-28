

export class Persona{
  id_persona: number;
  nombre: string;
  apellido: string;
  email: string;
  pais: string;
  religion: string;
  telefono: number;
  codigo: number;
  dni: number;
  estado: string;
 
 constructor(
  id_persona: number = 0,
  nombre: string = "",
  apellido: string = "",
  email: string = "",
  pais: string = "",
  religion: string = "",
  telefono: number = 0,
  codigo: number = 0,
  dni: number = 0,
  estado: string = "",
  ) {
    this.id_persona = id_persona;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.pais = pais;
    this.religion = religion;
    this.telefono = telefono;
    this.codigo = codigo;
    this.dni = dni;
    this.estado = estado;
  }

}