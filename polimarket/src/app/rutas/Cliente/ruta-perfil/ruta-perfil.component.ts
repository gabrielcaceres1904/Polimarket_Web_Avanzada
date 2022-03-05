import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../../servicios/interfaces/app/base-control.interface";
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";

@Component({
  selector: 'app-ruta-perfil',
  templateUrl: './ruta-perfil.component.html',
  styleUrls: ['./ruta-perfil.component.scss']
})
export class RutaPerfilComponent implements OnInit {

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

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly usuarioService: UsuarioService,
              private readonly formBuilder: FormBuilder,) {
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
    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idCliente'];
          this.buscarUsuario(this.idUsuario)
        }
      })
  }

  buscarUsuario(id:number){
    const buscarProductoraId$ = this.usuarioService.buscarUno(id);
    buscarProductoraId$
      .subscribe(
        {
          next: (data) => {
            this.usuarioActual = data as UsuarioInterface
            this.prepararFormulario()
          },
          error: (error) => {
            console.error(error)
          }
        }
      )
  }

  prepararFormulario(){
    this.formGroup = this.formBuilder
      .group(
        {
          nombre: [this.usuarioActual ? this.usuarioActual.nombre: '', Validators.required],
          apellido: [this.usuarioActual ? this.usuarioActual.apellido: '', Validators.required],
          domicilio: [this.usuarioActual ? this.usuarioActual.direccion: '', Validators.required],
          email: [this.usuarioActual.email ? this.usuarioActual.email: '', Validators.required],
        }
      )
  }

  prepararUsuario(){
    if(this.formGroup){
      const nombre = this.formGroup.get('nombre')?.value.trim()
      const apellido = this.formGroup.get('apellido')?.value.trim()
      const domicilio =  this.formGroup.get('domicilio')?.value.trim()
      const email = this.formGroup.get('email')?.value.trim()
      const password = this.usuarioActual.password.trim()
      if(nombre){
        return {
          idUsuario: this.usuarioActual.idUsuario,
          nombre: nombre,
          apellido: apellido,
          direccion: domicilio,
          email: email,
          password: password,
        }
      }
    }
    return {
      idUsuario: -1,
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      password: '',
    }
  }

  actualizarUsuario(){
    if(this.usuarioActual){
      const valoresAActualizar = this.prepararUsuario()
      const actualizar$ = this.usuarioService.actualizarPorId(this.usuarioActual.idUsuario, valoresAActualizar);
      actualizar$
        .subscribe(
          {
            next: (datos) => {
              //console.log({datos})
              this.refresh()
            },
            error: (error) => {
              console.error({error})
            }
          }
        )
    }
  }

  refresh(): void {
    window.location.reload();
  }

  volver() {
    const ruta = ['/cliente', this.usuarioActual.idUsuario, 'home'];
    this.router.navigate(ruta);
  }
}
