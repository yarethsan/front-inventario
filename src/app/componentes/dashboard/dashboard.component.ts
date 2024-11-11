import { Component } from '@angular/core';
import { RouterOutlet , Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  nombre:any;
  rol:any;
  constructor(private router : Router){}
  ngOnInit(){
    this.nombre = sessionStorage.getItem('nombre')
    this.rol = sessionStorage.getItem('rol')
  }
  pagina(ruta:string){
    this.router.navigate([ruta]);
  }
}
