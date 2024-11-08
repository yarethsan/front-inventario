import { Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';

export const routes: Routes = [
  { path: "" , component: DashboardComponent,
    children:[
      {path: "", redirectTo: "menu", pathMatch:"full"},
      {path: "menu", component: InicioComponent},
      {path: "ventas", component: VentasComponent},
      {path: "inventario", component: InventarioComponent}
    ]

  }
];
