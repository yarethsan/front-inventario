import { Component } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { debounceTime, Subject, switchMap } from 'rxjs';

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
  productosEncontrados: any[] = [];  // Lista para almacenar los productos encontrados
  productosSeleccionados: any[] = [];
  private searchSubject: Subject<string> = new Subject();  // Subject para manejar las búsquedas


  constructor(private ventasService: VentasService, private inventarioService: InventarioService) { }
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
      total: null,
      idUsuario: { idUsuario: parseInt("", 10) }
    }
    this.ventasService.agregarVenta(venta).subscribe({
      next: respuesta => console.log(),
      error: error => console.log()
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
  }

  eliminarProductoLista(index:number, producto:any){
    if(producto.cantidad > 1){
      producto.cantidad--;
      this.subtotal -=  producto.precio
    }else{
      this.subtotal -=  producto.precio
      this.productosSeleccionados.splice(index, 1);
    }
  }



}
