import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ProductoInterface} from "../../../servicios/interfaces/modelo/producto.interface";
import {ProductoService} from "../../../servicios/http/producto.service";
import {MatDialog} from "@angular/material/dialog";
// import {ModalComponent} from "../../../componentes/modal/modal.component";
import {ModalConfirmareliminarproductoComponent} from "../../../componentes/modal-confirmareliminarproducto/modal-confirmareliminarproducto.component";
import {ModalActualizarproductoComponent} from "../../../componentes/modal-actualizarproducto/modal-actualizarproducto.component";
import {CategoriaInterface} from "../../../servicios/interfaces/modelo/categoria.interface";
import {CategoriaService} from "../../../servicios/http/categoria.service";

@Component({
  selector: 'app-ruta-productos',
  templateUrl: './ruta-productos.component.html',
  styleUrls: ['./ruta-productos.component.scss']
})
export class RutaProductosComponent implements OnInit {
  listaProductos:ProductoInterface[]=[]
  arrayCategorias!:CategoriaInterface[];
  buscarProd='';
  constructor(
    private readonly activatedRoute:ActivatedRoute,
    private readonly productoServices:ProductoService,
    public dialog:MatDialog,
    private readonly categoriasService:CategoriaService,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.llenarProductos()
    const parametrosConsulta$ = this.activatedRoute.queryParams;
    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          console.log(queryParams);
          this.buscarProd = queryParams['nombreProducto'];
          if(this.buscarProd){
            this.buscarProducto();
          }else{
            this.llenarProductos();
          }
          // if(this.categoriaSeleccionada != undefined){
          //   this.buscarProductos(Number.parseInt(this.categoriaSeleccionada))
          // }
        },
        error: (error)=>{
          console.error(error)
        },
      }
    );
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
      );
  }

  llenarProductos(){
    this.productoServices.buscarTodos("")
      .subscribe(
        {
          next:(data)=>{
            if(data){
              this.listaProductos=data;
            }
          },
          error:(error)=>{
            console.log(error)
          },
          complete:()=>{

          }
        }
      )
  }
  actualizarProducto(producto:ProductoInterface){
    this.dialog.open(ModalActualizarproductoComponent,
      {
        width:"60%",
        height:"85%",
        data:{producto:producto,arrayCategorias:this.arrayCategorias}
      });
  }
  eliminarProducto(idProducto:number){
    this.dialog.open(ModalConfirmareliminarproductoComponent,
      {
        data:idProducto,
        width:"60%",
        height:"60%"
      })

  }

  buscarProducto(){
    this.productoServices.buscarTodos('').
      subscribe(
      {
        next:(data)=>{
          if(data){
            let productos:ProductoInterface[]=[];
            for(let producto of data){
              if(producto.nombre.trim()===this.buscarProd){
                productos.push(producto);
                this.listaProductos=productos;
                this.buscarProd='';
                break;
              }
            }
          }
        },
        error:(error)=>{

        },
        complete:()=>{

        }
      }
    )
  }
}
