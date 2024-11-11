import { Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { UsuarioComponent } from './usuarios/usuarios.component';
import { Component } from '@angular/core';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
  { path: "" , component: DashboardComponent,
    children:[

      {path: "", redirectTo: "menu", pathMatch:"full"},
      {path: "menu", component: InicioComponent},
      {path: "ventas", component: VentasComponent},
      {path: "inventario", component: InventarioComponent},
      {path: "usuarios", component: UsuarioComponent}
    ]

  }, {path: "login", component:LoginComponent}
];
