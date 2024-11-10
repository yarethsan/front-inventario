import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuarioComponent {
  editado: boolean = false;
  idUsuario!: number;
  usuarios: any;
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
      next: usuarios => {
        this.usuarios = usuarios;
      },
      error: error => {
        this.usuarios = null;
        console.error(error);
      }
    });
  }

  pagina(ruta: string) {
    this.router.navigate([ruta]);
  }

  agregarUsuario() {
    const usuario = {
      idUsuario: null,
      nombre: this.form.get('nombre')?.value,
      contrasena: this.form.get('contraseña')?.value,
      rol:{ idRol: parseInt( this.form.get('rol')?.value, 10)    }
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
        }
      });
      this.form.reset();
    }
  }

  editarUsuario(usuario: any) {
    this.editado = true;
    this.idUsuario = usuario.idUsuario;
    this.form.setValue({
      nombre: usuario.nombre,
      contraseña: usuario.contraseña,
      rol: usuario.rol
    });
  }

  eliminarUsuario(idUsuario: number) {
    this._usuariosService.eliminarUsuario(idUsuario).subscribe({
      next: respuesta => console.log(respuesta),
      error: error => console.error(error),
      complete: () => this.obtenerUsuarios()
    });
  }
}
