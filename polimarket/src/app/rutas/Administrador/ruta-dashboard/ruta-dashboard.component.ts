import { Component, OnInit } from '@angular/core';
import {SucursalProductoInterface} from "../../../servicios/interfaces/modelo/sucursal-producto.interface";
import {SucursalProductoService} from "../../../servicios/http/sucursal-producto.service";
import {AdminHomeBoxInterface} from "../../../servicios/interfaces/app/admin-home-box.interface";
import {ActivatedRoute} from "@angular/router";
import {SucursalInterface} from "../../../servicios/interfaces/modelo/sucursal.interface";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {SucursalService} from "../../../servicios/http/sucursal.service";
import {PedidoService} from "../../../servicios/http/pedido.service";
import {PedidoInterface} from "../../../servicios/interfaces/modelo/pedido.interface";
import {PedidoDetalleService} from "../../../servicios/http/pedidoDetalle.service";
import {PedidoDetalleInterface} from "../../../servicios/interfaces/modelo/pedido-detalle.interface";

@Component({
  selector: 'app-ruta-dashboard',
  templateUrl: './ruta-dashboard.component.html',
  styleUrls: ['./ruta-dashboard.component.scss']
})
export class RutaDashboardComponent implements OnInit {

  boxesAdminHome: AdminHomeBoxInterface[] = [
    {
      titulo: 'Pedidos sin stock',
      icon: 'inventory_2',
      value: -1
    },
    {
      titulo: 'Pedidos pendientes',
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

  pedidoDetalles: PedidoDetalleInterface[] = []

  constructor(private readonly sucursalProductoService: SucursalProductoService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly usuarioService: UsuarioService,
              private readonly sucursalService: SucursalService,
              private readonly pedidosService: PedidoService,
              private readonly detallePedidosService: PedidoDetalleService) { }

  ngOnInit(): void {
    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdmin'];
          this.buscarSucursal(this.idUsuario)
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }

  private buscarSucursal(idUsuario: number) {
    // Buscar info de sucursal
    this.sucursalService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursales = datos as SucursalInterface[]
            for(let sucursal of sucursales){
              if(sucursal.idUsuario == idUsuario){
                this.sucursalAdmin = sucursal
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            this.buscarValoresDashboard()
          }
        }
      )
  }

  private buscarValoresDashboard() {
    // Pedidos sin stock
    this.sucursalProductoService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursalProductos = datos as SucursalProductoInterface[]
            let cont = 0
            for(let sucursalProducto of sucursalProductos){
              if(sucursalProducto.stock === 0 && sucursalProducto.idSucursal === this.sucursalAdmin.idSucursal){
                cont++
              }
            }
            this.boxesAdminHome[0].value = cont
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )

    // Pedidos Entregados
    let pedidosEntregados: number[] = [] //idPedido
    this.pedidosService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const pedidos = datos as PedidoInterface[]
            let cont = 0
            for(let pedido of pedidos){
              if(pedido.estado.trim() === 'Pendiente'){
                cont++
                pedidosEntregados.push(pedido.idPedido)
              }
            }
            this.boxesAdminHome[1].value = cont
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            // Ingresos
            this.detallePedidosService.buscarTodos({})
              .subscribe(
                {
                  next: (datos) => { // try then
                    this.pedidoDetalles = datos as PedidoDetalleInterface[]
                  },
                  error: (error) => { // catch
                    console.error({error});
                  },
                  complete: () => {
                    let totalIngresos = 0
                    for(let pedido of pedidosEntregados){
                      let sum = 0
                      for (let pedidoDetalle of this.pedidoDetalles) {
                        if (pedidoDetalle.idPedido === pedido) {
                          sum += pedidoDetalle.valorTotal
                        }
                      }
                      totalIngresos += sum
                    }
                    this.boxesAdminHome[2].value = totalIngresos
                  }
                }
              )

          }
        }
      )
  }

}
