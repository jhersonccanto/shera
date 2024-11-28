import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  
private apiUrl='http://localhost:8080/api/empresa';
constructor(private http:HttpClient) { }

getEmpresaList(): Observable<Empresa[]> {
  return this.http.get<Empresa[]>(this.apiUrl);
}
getEmpresaById(id_empresa:number):Observable<Empresa>{
  return this.http.get<Empresa>(`${this.apiUrl}/${id_empresa}`);
}

crearEmpresa(empresa:Empresa): Observable<Empresa> {
  return this.http.post<Empresa>(this.apiUrl, empresa);
}

updateEmpresa( empresa: Empresa,id_empresa: number): Observable<any> {
  return this.http.put<Empresa>(`${this.apiUrl}/${id_empresa}`, empresa);
}

deleteEmpresa(id_empresa: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id_empresa}`);
}
deleteEmpresasBatch(ids: number[]): Observable<any> {
  return this.http.request('DELETE', `${this.apiUrl}/batch`, {
    body: ids,
  });
}
}