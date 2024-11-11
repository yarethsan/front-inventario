import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetalleventaService {

  private URL = `${enviroment.url}/detalle-venta`;
  constructor(private http: HttpClient) { }

  agregarDetalle(productos:any){
    return this.http.post(`${this.URL}/nuevos`, productos);
  }
}
