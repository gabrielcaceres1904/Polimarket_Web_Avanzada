import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UsuarioService} from "../../servicios/http/usuario.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaCuentasComponent} from "../../rutas/AdministradorGeneral/ruta-cuentas/ruta-cuentas.component";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";
import {UsuarioCreateInterface} from "../../servicios/interfaces/create/usuarioCreate.interface";
import {GlobalDataService} from "../../servicios/global/global-data.service";

@Component({
  selector: 'app-modal-eliminarcuenta',
  templateUrl: './modal-eliminarcuenta.component.html',
  styleUrls: ['./modal-eliminarcuenta.component.scss']
})
export class ModalEliminarcuentaComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private  readonly formBuilder:FormBuilder,
    private readonly usuarioService:UsuarioService,
    private readonly router:Router,
    public dialogRef:MatDialogRef<RutaCuentasComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data:UsuarioInterface
  ) { }

  ngOnInit(): void {
    this.prepararFormulario()
  }
  prepararFormulario(){
    this.formGroup=this.formBuilder.group(
      {
        nombre:new FormControl(
          {
            value:this.data.nombre.trim(),
            disabled:false,
          }
          ,[]
        ),
        apellido:new FormControl(
          {
            value:this.data.apellido.trim(),
            disabled:false,
          }
          ,[]
        ),
        direccion:new FormControl(
          {
            value:this.data.direccion.trim(),
            disabled:false,
          }
          ,[]
        ),
        email:new FormControl(
          {
            value:this.data.email.trim(),
            disabled:false,
          }
          ,[]
        ),
        password:new FormControl(
          {
            value:this.data.password.trim(),
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
        idUsuario:this.data.idUsuario,
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
    console.log("actualizando a ",this.data.idUsuario)
    this.usuarioService.actualizarPorId(this.data.idUsuario,usuarioActualiar)
      .subscribe(
        {
          next:(data)=>{
            console.log("Actualizando a ",data);
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            this.dialogRef.close();
            this.router.navigate(['admin-general',GlobalDataService.administradorGeneral.idUsuario,'home']);
          }
        }
      )
  }
}
