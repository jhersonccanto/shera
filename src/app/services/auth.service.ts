import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';  // URL de tu API

  constructor(private http: HttpClient) { }

  // Método de login
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(this.apiUrl, loginData);
  }

  // Verificar si el usuario está logueado (token simulado en localStorage)
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Obtener el token simulado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}