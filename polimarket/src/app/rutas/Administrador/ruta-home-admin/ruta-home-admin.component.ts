import { Component, OnInit } from '@angular/core';
import {AdminHomeBoxInterface} from "../../../servicios/interfaces/app/admin-home-box.interface";
import {SucursalProductoService} from "../../../servicios/http/sucursal-producto.service";
import {SucursalService} from "../../../servicios/http/sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SucursalInterface} from "../../../servicios/interfaces/modelo/sucursal.interface";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";

@Component({
  selector: 'app-ruta-home-admin',
  templateUrl: './ruta-home-admin.component.html',
  styleUrls: ['./ruta-home-admin.component.scss']
})
export class RutaHomeAdminComponent implements OnInit {
  tituloAdmin = 'Opciones de administrador';
  nombreAdmin = ''
  categories = ['Home', 'Productos', "Pedidos"];
  boxesAdminHome: AdminHomeBoxInterface[] = [
    {
      titulo: 'Pedidos sin stock',
      icon: 'inventory_2',
      value: -1
    },
    {
      titulo: 'Pedidos entregados',
      icon: 'local_shipping',
      value: -1
    },
    {
      titulo: 'Total de ingresos',
      icon: 'payments',
      value: -1
    },
  ]
  idUsuario = -1
  sucursalAdmin: SucursalInterface = {} as SucursalInterface

  constructor(private readonly sucursalProductoService: SucursalProductoService,
              private readonly sucursalService: SucursalService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly usuarioService: UsuarioService) {

  }
  ngOnInit() {

    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdmin'];
          this.buscarAdminSucursal(this.idUsuario)
          this.buscarValoresHome()
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }

  private buscarAdminSucursal(idUsuario: number) {
    this.usuarioService.buscarUno(idUsuario)
      .subscribe(
        {
          next: (datos) => { // try then
            const admin = datos as UsuarioInterface
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )

    this.sucursalService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursales = datos as SucursalInterface[]
            for(let sucursal of sucursales){
              if(sucursal.idUsuario == idUsuario){
                this.sucursalAdmin = sucursal
                this.tituloAdmin = sucursal.direccion
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }

  private buscarValoresHome() {
    this.sucursalProductoService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursalProductos = datos
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }


}
