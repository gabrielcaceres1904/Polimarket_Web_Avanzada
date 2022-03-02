import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../servicios/interfaces/base-control.interface";
import {Router} from "@angular/router";
import {UsuarioCreateInterface} from "../../servicios/interfaces/create/usuarioCreate.interface";
import {UsuarioService} from "../../servicios/http/usuario.service";

@Component({
  selector: 'app-ruta-sign-in',
  templateUrl: './ruta-sign-in.component.html',
  styleUrls: ['./ruta-sign-in.component.scss']
})
export class RutaSignInComponent implements OnInit {

  formGroup: FormGroup

  campos = [
    {
      titulo: 'Nombre', nombre: 'nombre', tipo: 'text', placeholder: 'Ingresa tu nombre', requeridoM: 'El nombre es requerido', longitudM: ''
    },
    {
      titulo: 'Apellido', nombre: 'apellido', tipo: 'text', placeholder: 'Ingresa tu apellido', requeridoM: 'El apellido es requerido', longitudM: ''
    },
    {
      titulo: 'Correo electrónico', nombre: 'correo', tipo: 'text', placeholder: 'Ingresa tu correo electrónico', requeridoM: 'El correo electrónico es requerido', longitudM: ''
    },
    {
      titulo: 'Dirección de domicilio', nombre: 'domicilio', tipo: 'text', placeholder: 'Ingresa la dirección de tu domicilio', requeridoM: 'La dirección de domicilio es requerida', longitudM: ''
    },
    {
      titulo: 'Contraseña', nombre: 'passwordUsuario', tipo: 'password', placeholder: 'Ingresa una contraseña', requeridoM: 'La contraseña es requerida', longitudM: 'La contraseña debe tener al menos 8 caracteres'
    },
    {
      titulo: 'Confirmación de Contraseña', nombre: 'passwordConfirmacion', tipo: 'password', placeholder: 'Ingresa nuevamente la contraseña', requeridoM: 'La confirmación es requerida', longitudM: 'La confirmación debe tener al menos 8 caracteres'
    },
  ] as baseControlInterface[]

  coincidencia = false

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly usuarioService: UsuarioService) {
    this.formGroup =this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', Validators.required],
        domicilio: ['', Validators.required],
        passwordUsuario: ['', Validators.required],
        passwordConfirmacion: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
  }

  registrarUsuario() {
    const nombre =  this.formGroup.get('nombre')?.value
    const apellido =  this.formGroup.get('apellido')?.value
    const correo =  this.formGroup.get('correo')?.value
    const domicilio =  this.formGroup.get('domicilio')?.value
    const password =  this.formGroup.get('passwordUsuario')?.value
    const confirmacion =  this.formGroup.get('passwordConfirmacion')?.value

    if(password === confirmacion){
      this.coincidencia = false
      const usuario = {
        nombre: nombre,
        apellido: apellido,
        direccion: domicilio,
        email: correo,
        password: password
      } as UsuarioCreateInterface
      this.usuarioService.crear(usuario)
        .subscribe(
          {
            next: (data) => {
              console.log(data)
            },
            error: (error) => {
              console.error(error)
            }
          }
        )
      const ruta = ['/login'];
      this.router.navigate(ruta);
    }else{
      this.coincidencia = true
    }

  }
}
