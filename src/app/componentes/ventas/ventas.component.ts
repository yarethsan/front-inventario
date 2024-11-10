import { Component } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  constructor(private ventasService: VentasService){}
  ngOnInit(){}
nuevaVenta(){
   const  venta = {
    idVenta: null,
    fecha: new Date(),
    total: null,
    idUsuario: {idUsuario: parseInt("",10)}
   }
   this.ventasService.agregarVenta(venta).subscribe({
    next: respuesta => console.log(), 
  error: error => console.log()
})
}



}
