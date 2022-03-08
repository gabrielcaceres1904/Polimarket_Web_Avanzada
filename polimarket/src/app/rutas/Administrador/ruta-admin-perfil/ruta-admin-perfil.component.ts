import { Component, OnInit } from '@angular/core';
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";
import {FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../../servicios/interfaces/app/base-control.interface";

@Component({
  selector: 'app-ruta-admin-perfil',
  templateUrl: './ruta-admin-perfil.component.html',
  styleUrls: ['./ruta-admin-perfil.component.scss']
})
export class RutaAdminPerfilComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}
