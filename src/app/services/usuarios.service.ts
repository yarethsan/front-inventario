import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private URL = `${enviroment.url}/usuario`;
  constructor(private http: HttpClient) {}

  obtenerTodosUsuarios(): Observable<any> {
    return this.http.get(`${this.URL}/`);
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.URL}/${id}`);
  }

  agregarNuevoUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.URL}/`, usuario);
  }

  actualizarUsuario(usuario: any, id: number): Observable<any> {
    return this.http.put(`${this.URL}/edita/${id}`, usuario);
  }
  activarDesactivarU(idUsuario: number, estado: boolean): Observable<any>{
    return this.http.put(`${this.URL}/${idUsuario}/estado`,{activo: estado});
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/eliminar/${id}`);
  }
}
