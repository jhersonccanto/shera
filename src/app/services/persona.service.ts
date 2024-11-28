import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl='http://localhost:8080/api/personas';


  constructor(private http: HttpClient) {}


  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  getPersonaById(id_persona: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id_persona}`);
  }

  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  updatePersona(persona: Persona, id_persona: number): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${id_persona}`, persona);
  }

  deletePersona(id_persona: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_persona}`);
  }
  deletePersonasBatch(ids: number[]): Observable<any> {
    return this.http.request('DELETE', `${this.apiUrl}/batch`, {
      body: ids,
    });
  }
}
