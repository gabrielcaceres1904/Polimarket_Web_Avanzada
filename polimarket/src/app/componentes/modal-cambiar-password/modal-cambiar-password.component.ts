import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../servicios/interfaces/app/base-control.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../servicios/http/usuario.service";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaListaProductosComponent} from "../../rutas/Cliente/ruta-lista-productos/ruta-lista-productos.component";
import {RutaPerfilComponent} from "../../rutas/Cliente/ruta-perfil/ruta-perfil.component";

@Component({
  selector: 'app-modal-cambiar-password',
  templateUrl: './modal-cambiar-password.component.html',
  styleUrls: ['./modal-cambiar-password.component.scss']
})
export class ModalCambiarPasswordComponent implements OnInit {
  passwordActual = ''
  passwordNueva = ''
  errorCoincidencia = false

  idUsuario = -1
  usuarioActual: UsuarioInterface = {} as UsuarioInterface

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly usuarioService: UsuarioService,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              public dialogRef: MatDialogRef<RutaPerfilComponent>) {
    this.usuarioActual = this.data.usuario
    this.idUsuario = this.data.usuario.idUsuario
  }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close()
  }

  cambiarPassword() {
    if(this.passwordActual.trim() === this.usuarioActual.password.trim()){
      this.dialogRef.close({passwordNueva: this.passwordNueva})
    }else{
      this.errorCoincidencia = true
    }
  }
}
