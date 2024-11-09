import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private URL=`${enviroment.url}/inventario`
  constructor(private http:HttpClient) { }

  obtenerInventario():Observable<any>{
    return this.http.get(`${this.URL}/`);
  }

  nuevoProducto(inventario:any):Observable<any>{
    return this.http.post(`${this.URL}/nuevo`,inventario); 
  }
  actualizarInventario(inventario:any, id:number):Observable<any>{
    return this.http.put(`${this.URL}/editar/${inventario}`, inventario);
  }           
  eliminarInventario(inventario:any, id:number):Observable<any>{
    return this.http.delete(`${this.URL}/${inventario}`)
  }
}
