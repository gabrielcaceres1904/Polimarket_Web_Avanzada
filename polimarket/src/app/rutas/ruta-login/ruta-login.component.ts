import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {baseControlInterface} from "../../servicios/interfaces/base-control.interface";
import {RolService} from "../../servicios/http/rol.service";
import {RolInterface} from "../../servicios/interfaces/modelo/rol.interface";

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

  usuarioInvalidado = false

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly rolService: RolService) {

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
    const correoUsuario = this.formGroup.get('correoUsuario')?.value
    const passwordUsuario = this.formGroup.get('passwordUsuario')?.value
    const tipoUsuario = this.formGroup.get('tipoUsuario')?.value

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
