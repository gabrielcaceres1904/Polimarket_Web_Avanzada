import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {Router} from "@angular/router";
import {GlobalDataService} from "../../../servicios/global/global-data.service";
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";

@Component({
  selector: 'app-ruta-admingeneral-perfil',
  templateUrl: './ruta-admingeneral-perfil.component.html',
  styleUrls: ['./ruta-admingeneral-perfil.component.scss']
})
export class RutaAdmingeneralPerfilComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private  readonly formBuilder:FormBuilder,
    private readonly usuarioService:UsuarioService,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.prepararFormulario()
  }
  prepararFormulario(){
    this.formGroup=this.formBuilder.group(
      {
        nombre:new FormControl(
          {
            value:GlobalDataService.administradorGeneral.nombre,
            disabled:false,
          }
          ,[]
        ),
        apellido:new FormControl(
          {
            value:GlobalDataService.administradorGeneral.apellido,
            disabled:false,
          }
          ,[]
        ),
        direccion:new FormControl(
          {
            value:GlobalDataService.administradorGeneral.direccion,
            disabled:false,
          }
          ,[]
        ),
        email:new FormControl(
          {
            value:GlobalDataService.administradorGeneral.email,
            disabled:false,
          }
          ,[]
        ),
        password:new FormControl(
          {
            value:GlobalDataService.administradorGeneral.password,
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
      const password = this.formGroup.get("password")?.value;
      const usuario={
        idUsuario:GlobalDataService.administradorGeneral.idUsuario,
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
    const objetoActualizar =this.prepararObjeto();
    if(GlobalDataService.administradorGeneral.idUsuario){
      this.usuarioService.actualizarPorId(GlobalDataService.administradorGeneral.idUsuario,objetoActualizar)
        .subscribe(
          {
            next:(data)=>{
              console.log("admin general update:",data);
            },
            error:()=>{

            },
            complete:()=>{

            }
          }
        )
    }

  }
}
