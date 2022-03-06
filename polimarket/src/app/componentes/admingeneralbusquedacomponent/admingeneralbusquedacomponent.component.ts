import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalRegistrocuentaComponent} from "../modal-registrocuenta/modal-registrocuenta.component";

@Component({
  selector: 'app-admingeneralbusquedacomponent',
  templateUrl: './admingeneralbusquedacomponent.component.html',
  styleUrls: ['./admingeneralbusquedacomponent.component.scss']
})
export class AdmingeneralbusquedacomponentComponent implements OnInit {

  constructor(
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }
  botonNuevo(){
    this.dialog.open(ModalRegistrocuentaComponent,{
      height:"85%",
      width:"60%"
    });
  }
}
