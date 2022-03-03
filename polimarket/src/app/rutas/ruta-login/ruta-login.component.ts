import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {baseControlInterface} from "../../servicios/interfaces/base-control.interface";
import {RolService} from "../../servicios/http/rol.service";
import {RolInterface} from "../../servicios/interfaces/modelo/rol.interface";
import {UsuarioService} from "../../servicios/http/usuario.service";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";
import {UsuarioRolService} from "../../servicios/http/usuario-rol.service";
import {UsuarioRolInterface} from "../../servicios/interfaces/modelo/usuario-rol.interface";

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  formGroup: FormGroup
  roles: RolInterface[] = [];

  campos = [
    {
      titulo: 'Correo electrónico', nombre: 'correoUsuario', tipo: 'text', placeholder: 'Ingresa tu correo electrónico', requeridoM: 'El correo electrónico es requerido', longitudM: ''
    },
    {
      titulo: 'Contraseña', nombre: 'passwordUsuario', tipo: 'password', placeholder: 'Ingresa tu contraseña', requeridoM: 'La contraseña es requerida', longitudM: ''
    },
  ] as baseControlInterface[]

  mensajeUsuarioInvalidado = false
  usuarioValidado: UsuarioInterface = {} as UsuarioInterface

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly rolService: RolService,
              private readonly usuarioService: UsuarioService,
              private readonly usuarioRolService: UsuarioRolService) {

    this.formGroup =this.formBuilder.group(
      {
        tipoUsuario: [Validators.required],
        correoUsuario: ['', Validators.required],
        passwordUsuario: ['', Validators.required],
      }
    )
    this.buscarRoles()
  }

  ngOnInit(): void {
  }

  buscarRoles(){
    this.rolService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            this.roles = datos
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }

  selectChangeHandler(event: any) {
    const valor = event.target.value;
  }

  validarUsuario() {
    const correoUsuario = this.formGroup.get('correoUsuario')?.value.trim()
    const passwordUsuario = this.formGroup.get('passwordUsuario')?.value.trim()
    const tipoUsuario = this.formGroup.get('tipoUsuario')?.value
    console.log('Este es el rol: ', tipoUsuario)

    this.usuarioService.buscarTodos(
      {
        email: correoUsuario,
        password: passwordUsuario,
      }
    ).subscribe({
        next: (datos) => { // try then
          const usuarios = datos as UsuarioInterface[]

          // Verificar correo y password
          for(let usuario of usuarios){
            if(correoUsuario === usuario.email.trim() && passwordUsuario === usuario.password.trim()){
              this.mensajeUsuarioInvalidado = false
              this.usuarioValidado = usuario
              console.log('Existe usuario con este correo y password')

              // Verificar el tipo de usuario
              this.usuarioRolService.buscarTodos({})
                .subscribe(
                  {
                    next: (data) => {
                      const usuariosRoles = data as UsuarioRolInterface[]
                      console.log(usuariosRoles)
                      for(let usuarioRol of usuariosRoles){
                        console.log('Rol: ', usuarioRol.idRol, ' Usuario: ', usuarioRol.idUsuario)
                        if(tipoUsuario === usuarioRol.idRol && this.usuarioValidado.idUsuario === usuarioRol.idUsuario){
                          console.log('El tipo de usuario coincide')
                          return
                        }
                      }
                      console.log('El tipo de usuario no coincide')
                    },
                    error: (error) => {
                      console.error(error)
                    }
                  }
                )
              return
            }
          }
          console.log('El correo y/o password no coinciden')
          this.mensajeUsuarioInvalidado = true
        },
        error: (error) => { // catch
          console.error({error});
        },
      }
    )

    const ruta = ['/home-cliente'];
    this.router.navigate(ruta);
  }

  buscarUsuario(id:number){
    /*
    const buscarPeliculaId$ = this.peliculaService.buscarUno(id);
    buscarPeliculaId$
      .subscribe(
        {
          next: (data) => {
            this.peliculaActual = data
            this.prepararFormulario()
          },
          error: (error) => {
            console.error(error)
          }
        }
      )

     */
  }
}
