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

  constructor(private router : Router){}

  pagina(ruta:string){
    this.router.navigate([ruta]);
  }
}
