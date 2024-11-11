import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private URL = `${enviroment.url}/ventas`;
  constructor(private http: HttpClient) { }
  agregarVenta(venta: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/nueva`, venta);
  }

}
