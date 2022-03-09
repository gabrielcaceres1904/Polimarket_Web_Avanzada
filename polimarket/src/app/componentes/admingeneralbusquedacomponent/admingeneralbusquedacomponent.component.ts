import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalRegistrocuentaComponent} from "../modal-registrocuenta/modal-registrocuenta.component";
import { Router} from "@angular/router";
import {GlobalDataService} from "../../servicios/global/global-data.service";

@Component({
  selector: 'app-admingeneralbusquedacomponent',
  templateUrl: './admingeneralbusquedacomponent.component.html',
  styleUrls: ['./admingeneralbusquedacomponent.component.scss']
})
export class AdmingeneralbusquedacomponentComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
  }
  botonBuscar(){
   const busqueda = <HTMLInputElement> document.getElementById("busquedaCuenta")
    let valorBusqueda = busqueda.value
    if(valorBusqueda!=""){
      if(GlobalDataService.administradorGeneral.idUsuario){
        this.router.navigate(['/admin-general',GlobalDataService.administradorGeneral.idUsuario,'cuentas'],
          {queryParams:{
              nombre:valorBusqueda
            }
          });
      }else{
        this.router.navigate(['/admin-general',GlobalDataService.administradorGeneral.idUsuario,'cuentas'],
          {
            queryParams:{
              nombre:valorBusqueda
            }
          });
      }
    }else{
      this.router.navigate(['/admin-general',GlobalDataService.administradorGeneral.idUsuario,'cuentas']);
    }
  }
  botonNuevo(){
    this.dialog.open(ModalRegistrocuentaComponent,{
      height:"85%",
      width:"60%"
    });
  }
}
