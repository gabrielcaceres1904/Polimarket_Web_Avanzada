import { Component, OnInit } from '@angular/core';
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";
import {FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../../servicios/interfaces/app/base-control.interface";

@Component({
  selector: 'app-ruta-admin-perfil',
  templateUrl: './ruta-admin-perfil.component.html',
  styleUrls: ['./ruta-admin-perfil.component.scss']
})
export class RutaAdminPerfilComponent implements OnInit {

  idUsuario = -1
  usuarioActual: UsuarioInterface = {} as UsuarioInterface

  formGroup: FormGroup

  campos = [
    {
      titulo: 'Nombre', nombre: 'nombre', tipo: 'text', placeholder: 'Ingresa tu nombre', requeridoM: 'El nombre es requerido', longitudM: ''
    },
    {
      titulo: 'Apellido', nombre: 'apellido', tipo: 'text', placeholder: 'Ingresa tu apellido', requeridoM: 'El apellido es requerido', longitudM: ''
    },
    {
      titulo: 'Dirección de domicilio', nombre: 'domicilio', tipo: 'text', placeholder: 'Ingresa la dirección de tu domicilio', requeridoM: 'La dirección de domicilio es requerida', longitudM: ''
    },
    {
      titulo: 'Correo electrónico', nombre: 'email', tipo: 'text', placeholder: 'Ingresa tu correo electrónico', requeridoM: 'El correo electrónico es requerido', longitudM: ''
    },
  ] as baseControlInterface[]

  constructor() {
    // @ts-ignore
    const parametroRuta = this.activatedRoute.parent.params;
    parametroRuta
      .subscribe({
        next:(parametrosRuta) => {
          this.idUsuario = parametrosRuta['idCliente'];
          this.buscarUsuario(this.idUsuario)
        }
      })

    this.formGroup = this.formBuilder.group(
      {
        nombre: [this.usuarioActual ? this.usuarioActual.nombre : '', Validators.required],
        apellido: [this.usuarioActual ? this.usuarioActual.apellido : '', Validators.required],
        domicilio: [this.usuarioActual ? this.usuarioActual.direccion : '', Validators.required],
        email: [this.usuarioActual.email ? this.usuarioActual.email: '', Validators.required],
      }
    )
  }

  ngOnInit(): void {
  }

  actualizarUsuario() {

  }
}
