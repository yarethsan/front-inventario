import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
  inventario: any;
  constructor(private router : Router, private _inventario:InventarioService){}

  ngOnInit(): void {
this._inventario.obtenerInventario().subscribe({
  next:inventario => this.inventario=inventario, 
  error: error => console.error('Error:', error),
})
  }

  pagina(ruta:string){
    this.router.navigate([ruta]);
  }

}
