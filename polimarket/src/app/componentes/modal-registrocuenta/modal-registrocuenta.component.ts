import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {baseControlInterface} from "../../servicios/interfaces/app/base-control.interface";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";
import {UsuarioCreateInterface} from "../../servicios/interfaces/create/usuarioCreate.interface";
import {UsuarioService} from "../../servicios/http/usuario.service";
import {Router} from "@angular/router";
import {GlobalDataService} from "../../servicios/global/global-data.service";
import {MatDialogRef} from "@angular/material/dialog";
import {RutaCuentasComponent} from "../../rutas/AdministradorGeneral/ruta-cuentas/ruta-cuentas.component";
import {UsuarioRolService} from "../../servicios/http/usuario-rol.service";
import {UsuarioRolCreateInterface} from "../../servicios/interfaces/create/usuarioRolCreate.interface";

@Component({
  selector: 'app-modal-registrocuenta',
  templateUrl: './modal-registrocuenta.component.html',
  styleUrls: ['./modal-registrocuenta.component.scss']
})
export class ModalRegistrocuentaComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
     private  readonly formBuilder:FormBuilder,
     private readonly usuarioService:UsuarioService,
     private readonly router:Router,
     public dialogRef:MatDialogRef<RutaCuentasComponent>,
     private readonly usuarioRol:UsuarioRolService
  ) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group(
      {
        nombre:new FormControl(
          {
            value:'',
            disabled:false,
          }
          ,[]
        ),
        apellido:new FormControl(
          {
            value:'',
            disabled:false,
          }
          ,[]
        ),
        direccion:new FormControl(
          {
            value:'',
            disabled:false,
          }
          ,[]
        ),
        email:new FormControl(
          {
            value:'',
            disabled:false,
          }
          ,[]
        ),
        password:new FormControl(
          {
            value:'',
            disabled:false,
          }
          ,[]
        )
      }
    )
  }
  prepararObjeto():UsuarioCreateInterface{
    if(this.formGroup){
      const nombre = this.formGroup.get("nombre")?.value;
      const apellido = this.formGroup.get("apellido")?.value;
      const direccion = this.formGroup.get("direccion")?.value;
      const email = this.formGroup.get("email")?.value;
      const password = this.formGroup.get("password")?.value;
      const usuario={
        nombre:nombre,
        apellido:apellido,
        direccion:direccion,
        email:email,
        password:password
      } as UsuarioCreateInterface
      return usuario
    }
    return {
      nombre:"default",
      apellido:"default",
      direccion:"default",
      email:"default",
      password:"default"
    }
  }
  ingresarCuenta(){
    let usuarioExito=false;
    let rolusuarioExito=false;
    const usuario =this.prepararObjeto();
    let idUsuarioCreado=0;
    this.usuarioService.crear(usuario).subscribe(
      {
        next:(data)=>{
          console.log("usuario create:", data);
          idUsuarioCreado=data.idUsuario;
        },
        error:(error)=>{
          console.log(error);
        },
        complete:()=>{
          usuarioExito=true;
          if(usuarioExito){
            const usuarioRolInterface={
              idUsuario:idUsuarioCreado,
              idRol:2
            } as UsuarioRolCreateInterface;
            this.usuarioRol.crear(usuarioRolInterface).subscribe({
              next:(data)=>{
                if(data){
                  console.log("creando rol usuario",data);
                  rolusuarioExito=true;
                  if(rolusuarioExito&&usuarioExito){
                    this.dialogRef.close();
                    this.router.navigate(["/admin-general",GlobalDataService.administradorGeneral.idUsuario,'cuentas']);
                  }else{
                    this.dialogRef.close();
                  }
                }
              },
              error:(error)=>{

              },
            });
          }
        }
      }
    );
  }
  cancelar(){

  }
}
