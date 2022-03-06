import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ModalRegistrocuentaComponent} from "../modal-registrocuenta/modal-registrocuenta.component";
import {ModalRegistroproductoComponent} from "../modal-registroproducto/modal-registroproducto.component";
import {CategoriaService} from "../../servicios/http/categoria.service";
import {CategoriaInterface} from "../../servicios/interfaces/modelo/categoria.interface";

@Component({
  selector: 'app-admingeneralbusqproductos',
  templateUrl: './admingeneralbusqproductos.component.html',
  styleUrls: ['./admingeneralbusqproductos.component.scss']
})
export class AdmingeneralbusqproductosComponent implements OnInit {
  arrayCategorias!:CategoriaInterface[];
  constructor(
    public dialog:MatDialog,
    private readonly router:Router,
    private readonly categoriasService:CategoriaService
  ) { }

  ngOnInit(): void {
    //Aqui se cargan las categorias para registro producto
    this.categoriasService.buscarTodos('')
      .subscribe(
        {
          next:(data)=>{
            if(data){
              this.arrayCategorias=data;
            }
          },
          error:(error)=>{

          },
          complete:()=>{

          }
        }
      )
  }
  botonNuevo(){
    this.dialog.open(ModalRegistroproductoComponent,{
      data:this.arrayCategorias,
      height:"85%",
      width:"60%"
    });
  }
  botonBuscar(){

  }
}
