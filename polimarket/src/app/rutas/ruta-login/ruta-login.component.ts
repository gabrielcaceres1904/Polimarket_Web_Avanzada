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
      titulo: '', nombre: 'nombreUsuario', tipo: 'text', placeholder: 'Nombre de usuario', requeridoM: 'El nombre de usuario es requerido', longitudM: ''
    },
    {
      titulo: '', nombre: 'passwordUsuario', tipo: 'password', placeholder: 'Contraseña', requeridoM: 'La contraseña es requerida', longitudM: ''
    },
  ] as baseControlInterface[]


  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly rolService: RolService) {

    this.formGroup =this.formBuilder.group(
      {
        tipoUsuario: [Validators.required],
        nombreUsuario: ['', Validators.required],
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
    const nombreUsuario = this.formGroup.get('nombreUsuario')?.value
    const tipoUsuario = this.formGroup.get('tipoUsuario')?.value
    this.rolService.buscarTodos({

    })
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
