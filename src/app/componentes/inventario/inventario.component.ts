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

editado:boolean=false
idProducto!: number ;
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

  obtenerProductos() {
    this._inventario.obtenerInventario().subscribe({
      next: inventario => {
        this.inventario = inventario
        
      },
      error: error => {this.inventario=null},
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
    if ( !this.editado) {
      this._inventario.nuevoProducto(producto).subscribe({
        next: respuesta => console.log(respuesta),
        error: error => console.error(error),
        complete: () => this.obtenerProductos()
      })
    } else {
      console.log("editado", this.form.value)
      this._inventario.actualizarInventario(producto, this.idProducto).subscribe({
        next: respuesta => console.log(respuesta),
        error: error => console.error(error),
        complete: () => {this.obtenerProductos();
          this.editado = false
        }
      })
      this.form.setValue({
        codigoBarras: null,
        nombreProducto : null,
        precio: null,
        cantidad: null
      })
      
      
    }
    
  }

  editarProducto(producto: any) {
    this.editado = true 
    this.idProducto = producto.idProducto
    console.log(producto )
    this.form.setValue({
      codigoBarras: null,
      nombreProducto : producto.nombreProducto,
      precio: producto.precio,
      cantidad: producto.cantidadDisponible
    })
  }
  eliminarProducto (idProducto: number) {
    this._inventario.eliminarInventario(idProducto).subscribe({
      next: respuesta => console.log(respuesta),
      error: error => console.error(error),
      complete: () => this.obtenerProductos()
    })
    console.log (idProducto)
  }

}
