import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    contrasena: new FormControl(''),
  })


  constructor(private loginService: LoginService, private routest: Router) { }
  onLogin() {console.log("AQUI ES EL LOGIN")
    const nombre = this.form.get('nombre')?.value;
    const contrasena = this.form.get('contrasena')?.value;
  console.log(nombre, contrasena)
    this.loginService.login(nombre, contrasena).subscribe({
      next: respuesta => {
        console.log(respuesta)
        if (respuesta.rol.idRol == 1) {
          sessionStorage.setItem('nombre', respuesta.nombre) 
          sessionStorage.setItem('rol', respuesta.rol.descripcion) 
          this.routest.navigate(['dashboard']); 
        }
      },
      error: err => {
        console.error('Error en login', err);
      }
    });
  }
}