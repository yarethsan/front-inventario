import { Component } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { DetalleventaService } from '../../services/detalleventa.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  searchQuery: string = '';
  subtotal = 0;
  impuestos = 0;
  total = 0;
  productosEncontrados: any[] = [];  // Lista para almacenar los productos encontrados
  productosSeleccionados: any[] = [];
  private searchSubject: Subject<string> = new Subject();  // Subject para manejar las búsquedas


  constructor(private ventasService: VentasService, private inventarioService: InventarioService, private detalleVenta:DetalleventaService) { }
  ngOnInit() {
    // Suscribirse al Subject para emitir búsquedas cuando cambie el valor
    this.searchSubject.pipe(
      debounceTime(300),  // Esperar 300ms después de que el usuario deje de escribir
      switchMap((searchTerm: string) => this.inventarioService.buscarPorCodigoBarras(searchTerm, searchTerm))  // Hacer la búsqueda
    ).subscribe(
      (productos) => {
        this.productosEncontrados = productos;  // Guardamos los productos encontrados
      },
      (error) => {
        console.error('Error al buscar productos', error);
      }
    );
  }
  ngOnChange() {
    console.log()
  }
  nuevaVenta() {
    const venta = {
      idVenta: null,
      fecha: new Date(),
      total: this.total,
      idUsuario: { idUsuario: 11 }
    }
    console.log(this.productosSeleccionados)
    let id:number;
    this.ventasService.agregarVenta(venta).subscribe({
      next: respuesta => id = respuesta.idVenta,
      error: error => console.log(),
      complete: () => this.agregarDetalle(id,this.productosSeleccionados)
    })
  }

  // Método que se llama cuando el usuario escribe en el input
  buscarProductos() {
    this.searchSubject.next(this.searchQuery);  // Emitimos el valor del input al Subject
  }

  // Método para agregar el producto a la tabla
  agregarProducto(producto: any) {
    // Verificamos si el producto ya está en la lista
    const productoExistente = this.productosSeleccionados.find(p => p.codigo === producto.codigo);

    if (productoExistente) {
      // Si el producto ya existe, solo sumamos 1 a la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si no existe, lo agregamos con cantidad 1
      producto.cantidad = 1;
      this.productosSeleccionados.push(producto);
    }
    this.subtotal +=  producto.precio;
    this.impuestos = this.subtotal * 0.1;
    this.total = this.subtotal + this.impuestos;
  }

  eliminarProductoLista(index:number, producto:any){
    if(producto.cantidad > 1){
      producto.cantidad--;
      this.subtotal -=  producto.precio
      this.impuestos = this.subtotal * 0.1;
      this.total = this.subtotal + this.impuestos;
    }else{
      this.subtotal -=  producto.precio
      this.impuestos = this.subtotal * 0.1;
      this.productosSeleccionados.splice(index, 1);
      this.total = this.subtotal + this.impuestos;
    }
  }

  agregarDetalle(idVenta:number, listaProductos:any){
    let nuevaLista:any[] = [];
      for(let producto of listaProductos){
        const id = producto.idProducto
        const p = {
          idDetalle: null,
          venta: { idVenta: idVenta },
          inventario: { idProducto: id },
          cantidad: producto.cantidad,
          subtotal: producto.cantidad * producto.precio
        }        
        nuevaLista.push(p);
      }
    this.detalleVenta.agregarDetalle(nuevaLista).subscribe({
      next: (data) => {console.log(data)},
      error: (error) => {console.error(error)}
    })
  }

}
