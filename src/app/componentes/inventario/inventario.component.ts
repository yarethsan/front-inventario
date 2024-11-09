import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from '../../services/inventario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';



@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

  inventario: any;
  form: FormGroup = new FormGroup({
    codigoBarras: new FormControl(''),
    nombreProducto: new FormControl(''),
    precio: new FormControl(''),
    cantidad: new FormControl('')
  })
  constructor(private router: Router, private _inventario: InventarioService) { }

  ngOnInit(): void {
this.obtenerProductos()
  }

  obtenerProductos(){
    this._inventario.obtenerInventario().subscribe({
      next: inventario => this.inventario = inventario,
      error: error => console.error('Error:', error),
    })
  }

  pagina(ruta: string) {
    this.router.navigate([ruta]);
  }

  agregarProducto() {
    const producto = {
      idProducto: null,
      //codigoBarras: this.form.get('codigoBarras')?.value,
      nombreProducto: this.form.get('nombreProducto')?.value,
      precio: this.form.get('precio')?.value,
      cantidadDisponible: this.form.get('cantidad')?.value
    }
    this._inventario.nuevoProducto(producto).subscribe({
      next: respuesta => console.log(respuesta),
      error: error=> console.error(error),
      complete: ()=> this.obtenerProductos()
    })
    console.log(this.form.value)
  }

}
