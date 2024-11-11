import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 private URL = `${enviroment.url}/usuario`;
 constructor(private http: HttpClient) {}
 login (nombre: string, contrasena: string):Observable<any>{
  const params= new HttpParams()
  .set('nombre', nombre)
  .set('contrasena', contrasena);

return this.http.post(`${this.URL}/login`, null, { params });
}
}

