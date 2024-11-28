import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Practica } from '../models/practica';

@Injectable({
  providedIn: 'root'
})
export class PracticaService {

  private apiUrl = 'http://localhost:8080/api/solicitud'; // URL del backend para obtener las prácticas

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de prácticas con la información solicitada
  getPracticas(): Observable<Practica[]> {
    return this.http.get<Practica[]>(this.apiUrl);
  }

// Obtener el detalle de una práctica por ID
getPracticaDetalleById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/detalle/${id}`);
}

// Buscar solicitudes por código
buscarSolicitudesPorCodigo(codigo: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/buscar/${codigo}`);
}


  // private apiUrl='http://localhost:8080/api/practica';
  // constructor(private http:HttpClient) { }
  
  // getPracticaList():Observable<Practica[]>{
  // return this.http.get<Practica[]>(this.apiUrl);
  // }
  // getPracticaById(id_practica:number):Observable<Practica>{
  //   return this.http.get<Practica>(`${this.apiUrl}/${id_practica}`);
  // }
  
  // crearPractica(practica:Practica):Observable<Practica>{
  //   return this.http.post<Practica>(this.apiUrl, practica);
  // }
  
  // deletePractica(id_practica:number){
  //   return this.http.delete(`${this.apiUrl}/${id_practica}`);
  // }
  
  // updatePractica(practica:Practica, id_practica:number):Observable<Practica>{
  //   return this.http.put<Practica>(`${this.apiUrl}/${id_practica}`, practica);


  // }
}
