import {Component, OnInit} from '@angular/core';
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalDataService} from "../../../servicios/global/global-data.service";
import {baseControlInterface} from "../../../servicios/interfaces/app/base-control.interface";
import {ModalCambiarPasswordComponent} from "../../../componentes/modal-cambiar-password/modal-cambiar-password.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-ruta-admin-perfil',
  templateUrl: './ruta-admin-perfil.component.html',
  styleUrls: ['./ruta-admin-perfil.component.scss']
})
export class RutaAdminPerfilComponent implements OnInit {

  formGroup: FormGroup

  idUsuario = -1
  usuarioActual: UsuarioInterface = {} as UsuarioInterface
  constructor(
    private  readonly formBuilder:FormBuilder,
    private readonly usuarioService:UsuarioService,
    private readonly router:Router,
    private readonly activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {

    // @ts-ignore
    const parametroRuta = this.activatedRoute.parent.params;
    parametroRuta
      .subscribe({
        next:(parametrosRuta) => {
          this.idUsuario = parametrosRuta['idAdmin'];
          this.buscarUsuario(this.idUsuario)
        }
      })

    this.formGroup = this.formBuilder.group(
      {
        nombre: [this.usuarioActual ? this.usuarioActual.nombre : '', Validators.required],
        apellido: [this.usuarioActual ? this.usuarioActual.apellido : '', Validators.required],
        direccion: [this.usuarioActual ? this.usuarioActual.direccion : '', Validators.required],
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
          this.idUsuario = parametrosRuta['idAdmin'];
          this.buscarUsuario(this.idUsuario)
        }
      })

  }
  prepararFormulario(){
    this.formGroup=this.formBuilder.group(
      {
        nombre:new FormControl(
          {
            value:this.usuarioActual.nombre.trim(),
            disabled:false,
          }
          ,[]
        ),
        apellido:new FormControl(
          {
            value:this.usuarioActual.apellido.trim(),
            disabled:false,
          }
          ,[]
        ),
        direccion:new FormControl(
          {
            value:this.usuarioActual.direccion.trim(),
            disabled:false,
          }
          ,[]
        ),
        email:new FormControl(
          {
            value:this.usuarioActual.email.trim(),
            disabled:false,
          }
          ,[]
        )
      }
    )
  }
  prepararObjeto():UsuarioInterface{
    if(this.formGroup){
      const nombre = this.formGroup.get("nombre")?.value;
      const apellido = this.formGroup.get("apellido")?.value;
      const direccion = this.formGroup.get("direccion")?.value;
      const email = this.formGroup.get("email")?.value;
      const password = this.usuarioActual.password
      const usuario={
        idUsuario:this.idUsuario,
        nombre:nombre,
        apellido:apellido,
        direccion:direccion,
        email:email,
        password:password
      } as UsuarioInterface;
      return usuario;
    }
    return {
      idUsuario:0,
      nombre:"default",
      apellido:"default",
      direccion:"default",
      email:"default",
      password:"default"
    }

  }
  actualizarCuenta(){
    const usuarioActualiar = this.prepararObjeto()
    //console.log("actualizando a ",this.data.idUsuario)
    this.usuarioService.actualizarPorId(this.idUsuario,usuarioActualiar)
      .subscribe(
        {
          next:(data)=>{
            console.log("Actualizando a ",data);
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            this.refresh()
          }
        }
      )
  }

  refresh(): void {
    window.location.reload();
  }

  private buscarUsuario(id: number) {
    this.usuarioService.buscarUno(id)
      .subscribe(
        {
          next: (datos) => { // try then
            this.usuarioActual = datos as UsuarioInterface
            //console.log(this.usuarioActual)
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            this.prepararFormulario()
          }
        }
      )
  }

  cancelar() {
    const ruta = ['/admin', this.idUsuario, 'home']
    this.router.navigate(ruta)
  }

  cambiarPassword() {
    const referenciaDialogo = this.dialog.open(
      ModalCambiarPasswordComponent,
      {
        disableClose: false,
        data: {
          usuario: this.usuarioActual
        }
      }
    )
    const despuesCerrado$ = referenciaDialogo.afterClosed()
    despuesCerrado$
      .subscribe(
        (datos) => {
          if(datos!=undefined){
            this.usuarioActual.password = datos['passwordNueva']
            this.actualizarCuenta()
          }
        }
      )
  }
}
