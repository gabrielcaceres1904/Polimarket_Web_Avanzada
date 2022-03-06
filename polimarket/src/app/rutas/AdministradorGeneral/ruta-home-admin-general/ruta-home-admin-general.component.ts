import { Component, OnInit } from '@angular/core';
import {ProductoService} from "../../../servicios/http/producto.service";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalDataService} from "../../../servicios/global/global-data.service";

@Component({
  selector: 'app-ruta-home-admin-general',
  templateUrl: './ruta-home-admin-general.component.html',
  styleUrls: ['./ruta-home-admin-general.component.scss']
})
export class RutaHomeAdminGeneralComponent implements OnInit {
  tituloAdminGeneral="Administrador General";
  cantidadProductos = 0;
  cantidadCuentas = 0;
  categories:{
    idCategoria: number,
    categoria: string,
    cantProductos: number
  }[]=[
    {
      idCategoria:1,
      categoria:"Cuentas",
      cantProductos:6
    },
    {
      idCategoria:2,
      categoria:"Productos",
      cantProductos:this.cantidadProductos
    }
  ]
  categorias=[
    {
      categoria:"Cuentas",
      cantProductos:10
    },
    {
      categoria:"Productos",
      cantProductos:15
    }
  ]
  constructor(
    private readonly productsService:ProductoService,
    private readonly usuariosService:UsuarioService,
    private readonly activatedRoute:ActivatedRoute,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.productsService.buscarTodos("").subscribe(
      {
        next:(data)=>{
          if(data){
            this.cantidadProductos=data.length;
            console.log("cantidad productos :",this.cantidadProductos);
            this.categories[1].cantProductos=this.cantidadProductos;
          }else{
            console.log("no hay productos");
          }
        }
      }
    )
    this.usuariosService.buscarTodos("").subscribe(
      {
        next:(data)=>{
          if(data){
            this.cantidadCuentas=data.length
            this.categories[0].cantProductos=this.cantidadCuentas
          }
        }
      }
    )
    const parametroRuta$ = this.activatedRoute.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          if(parametrosRuta['categoria']==="1"){
            this.router.navigate(["/admin-general",GlobalDataService.usuarioActual.idUsuario,"cuentas"])
          }
          if(parametrosRuta['categoria']==="2"){
            this.router.navigate(["/admin-general",GlobalDataService.usuarioActual.idUsuario,"productos"])
          }
        }
      })
  }

}
