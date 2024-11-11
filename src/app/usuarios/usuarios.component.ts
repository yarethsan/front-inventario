import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuarioComponent implements OnInit {
  editado: boolean = false;
  idUsuario!: number;
  usuarios: any[] = [];
  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    contraseña: new FormControl(''),
    rol: new FormControl('')
  });

  constructor(private router: Router, private _usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuariosService.obtenerTodosUsuarios().subscribe({
      next: usuarios => this.usuarios = usuarios,
      error: (error) => console.error("error.exe", error)
    });
  }

  pagina(ruta: string) {
    this.router.navigate([ruta]);
  }

  agregarUsuario() {
    const usuario = {
      idUsuario: this.editado ? this.idUsuario : null,
      nombre: this.form.get('nombre')?.value,
      contrasena: this.form.get('contraseña')?.value,
      rol: { idRol: parseInt(this.form.get('rol')?.value, 10) }
    };

    if (!this.editado) {
      this._usuariosService.agregarNuevoUsuario(usuario).subscribe({
        next: respuesta => console.log(respuesta),
        error: error => console.error(error),
        complete: () => this.obtenerUsuarios()
      });
    } else {
      this._usuariosService.actualizarUsuario(usuario, this.idUsuario).subscribe({
        next: respuesta => console.log(respuesta),
        error: error => console.error(error),
        complete: () => {
          this.obtenerUsuarios();
          this.editado = false;
          this.form.reset();
        }
      });
    }
  }

  editarUsuario(usuario: any) {
    this.editado = true;
    this.idUsuario = usuario.idUsuario;

   
    this.form.setValue({
      nombre: usuario.nombre,
      contrasena: usuario.contrasena || '',  
      rol: usuario.rol.idRol
    });
  }

  activarDesactivarU(idUsuario: number, estado: boolean) {
    this._usuariosService.activarDesactivarU(idUsuario, estado).subscribe({
      next: respuesta => { 
        console.log(respuesta);
        this.obtenerUsuarios(); 
      },
      error: error => console.error(error)
    });
  }
}
