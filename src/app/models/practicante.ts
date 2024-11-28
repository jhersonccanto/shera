
import { Persona } from "./persona";
import { PlanCarrera } from "./plancarrera";


export class Practicante {
  id_practicante: number;
  horas_acumuladas: number;
  horas_ps: number;
  ciclo: number;  // Nuevo campos
  grupo: number;  // Nuevo campo
  correo_institucional:string;
  persona: Persona;
  plancarrera: PlanCarrera;
  estado: string;
   // Nueva relación con Practica

  // Constructor con valores predeterminados
  constructor(
    id_practicante: number = 0,
    horas_acumuladas: number = 0,
    horas_ps: number = 0,
    ciclo: number = 0,
    grupo: number = 0,
    correo_institucional:string='',
    persona: Persona = new Persona(),
    plancarrera: PlanCarrera = new PlanCarrera(),
    estado: string= '',

  ) {
    this.id_practicante = id_practicante;
    this.horas_acumuladas = horas_acumuladas;
    this.horas_ps = horas_ps;
    this.ciclo = ciclo;
    this.grupo = grupo;
    this.correo_institucional=correo_institucional;
    this.persona = persona;
    this.plancarrera = plancarrera;
    this.estado = estado;
 
  }
}
