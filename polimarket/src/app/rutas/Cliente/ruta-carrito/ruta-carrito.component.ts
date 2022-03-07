import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from "../../../servicios/global/global-data.service";
import {CompraCarritoInterface} from "../../../servicios/interfaces/app/compra-carrito.interface";
import {PedidoService} from "../../../servicios/http/pedido.service";
import {PedidoDetalleService} from "../../../servicios/http/pedidoDetalle.service";
import {PedidoInterface} from "../../../servicios/interfaces/modelo/pedido.interface";
import { DatePipe } from '@angular/common';
import {PedidoDetalleCreateInterface} from "../../../servicios/interfaces/create/pedido-detalleCreate.interface";
import {PedidoCreateInterface} from "../../../servicios/interfaces/create/pedidoCreate.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TarjetaService} from "../../../servicios/http/tarjeta.service";
import {TarjetaInterface} from "../../../servicios/interfaces/modelo/tarjeta.interface";
import {TarjetaCreateInterface} from "../../../servicios/interfaces/create/tarjetaCreate.interface";
import {ModalPagoComponent} from "../../../componentes/modal-pago/modal-pago.component";
import {ProductoInterface} from "../../../servicios/interfaces/modelo/producto.interface";
import {SucursalProductoService} from "../../../servicios/http/sucursal-producto.service";
import {SucursalProductoInterface} from "../../../servicios/interfaces/modelo/sucursal-producto.interface";

@Component({
  selector: 'app-ruta-carrito',
  templateUrl: './ruta-carrito.component.html',
  styleUrls: ['./ruta-carrito.component.scss'],
  providers: [DatePipe]
})
export class RutaCarritoComponent implements OnInit {

  idUsuario = -1

  // Carrito
  prefix = 'https://bit.ly/'
  compras: CompraCarritoInterface[] = []
  subtotal = 0
  iva = 0.12

  //Pedidos
  estadoPendiente = 'Pendiente'

  // Pagos
  tieneTarjetas = false
  tarjetasUsuario: TarjetaInterface[] = []

  constructor(private readonly pedidoService: PedidoService,
              private readonly router: Router,
              private readonly pedidoDetalleService: PedidoDetalleService,
              private datePipe: DatePipe,
              private readonly activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private readonly tarjetaService: TarjetaService,
              private readonly sucursalProductoService: SucursalProductoService) {
    // @ts-ignore
    this.compras = GlobalDataService.comprasCarrito
    for(let compra of this.compras){
      this.subtotal += compra.producto.precio * compra.cantidad
    }

  }

  ngOnInit(): void {
    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idCliente'];
        }
      })
  }

  verificarTarjetas(){
    this.tarjetaService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const tarjetas = datos as TarjetaInterface[]
            for(let tarjeta of tarjetas){
              if(tarjeta.idUsuario == this.idUsuario){
                this.tieneTarjetas = true
                this.tarjetasUsuario.push(tarjeta)
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            if(!this.tieneTarjetas){
              this.desplegarModal(false)
            }else{
              this.desplegarModal(true)
              console.log('Ya tiene una o más tarjetas')
              //this.registrarPedido()
            }
          }
        }
      )
  }

  desplegarModal(tieneTarjetas: boolean){
    const referenciaDialogo = this.dialog.open(
      ModalPagoComponent,
      {
        disableClose: false,
        data: {
          idUsuario: this.idUsuario,
          tieneTarjetas: tieneTarjetas
        }
      }
    )
    const despuesCerrado$ = referenciaDialogo.afterClosed()
    despuesCerrado$
      .subscribe(
        (datos) => {
          //console.log(datos)
          if(datos!=undefined){
            const tarjeta = datos['tarjeta'] as TarjetaCreateInterface
            if(datos['create']){
              //console.log(tarjeta)
              this.tarjetaService.crear(tarjeta)
                .subscribe(
                  {
                    next: (data) => {
                      console.log(data)
                    },
                    error: (error) => {
                      console.error(error)
                    },
                    complete: () => {
                      this.registrarPedido()
                    }
                  }
                )
            }else{
              console.log('Tarjeta Usada: ', tarjeta)
              this.registrarPedido()
            }
          }
        }
      )
  }

  registrarPedido() {
    //const todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const pedidoNuevo = {
      fechaPedido: new Date(),
      estado: this.estadoPendiente,
      idUsuario: this.idUsuario
    } as PedidoCreateInterface

    // Crear pedido
    this.pedidoService.crear(pedidoNuevo)
      .subscribe(
        {
          next: (data) => {
            //console.log(data)
            const usuarioCreado = data as PedidoInterface
            const idPedido = usuarioCreado.idPedido
            for(let compra of this.compras){
              const detallePedido = {
                cantidad: compra.cantidad,
                valorTotal: compra.producto.precio * compra.cantidad,
                idPedido: idPedido,
                idProducto: compra.producto.idProducto
              } as PedidoDetalleCreateInterface

              // Crear Detalle Pedidos
              this.pedidoDetalleService.crear(detallePedido)
                .subscribe(
                  {
                    next: (data) => {
                      //console.log(data)
                    },
                    error: (error) => {
                      console.error(error)
                    }
                  }
                )
            }
          },
          error: (error) => {
            console.error(error)
          },
          complete: () => {
            this.reducirStock()
          }
        }
      )
  }

  reducirStock(){
    this.sucursalProductoService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursalProductos = datos as SucursalProductoInterface[]
            for(let compra of this.compras){
              for(let sucursalProducto of sucursalProductos){
                if(compra.idSucursal === sucursalProducto.idSucursal){
                  this.actualizarStock(sucursalProducto, compra.cantidad)
                }
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            this.compras = []
          }
        }
      )
  }

  actualizarTotales() {
    let subtotalLocal = 0
    for(let compra of this.compras){
      subtotalLocal += compra.producto.precio * compra.cantidad
    }
    this.subtotal = subtotalLocal
  }

  eliminarCompra(compra: any) {
    const compraInterface = compra as CompraCarritoInterface
    for(let comp of GlobalDataService.comprasCarrito){
      if(comp.producto.idProducto === compraInterface.producto.idProducto){
        const index = GlobalDataService.comprasCarrito.indexOf(comp)
        GlobalDataService.comprasCarrito.splice(index, 1)
      }
    }
    this.actualizarTotales()
  }

  private actualizarStock(sucursalProducto: SucursalProductoInterface, cantidadCompra: number) {
    const valoresAActualizar = {
      idSucursalProducto: sucursalProducto.idSucursalProducto,
      stock: sucursalProducto.stock - cantidadCompra,
      idSucursal: sucursalProducto.idSucursal,
      idProducto: sucursalProducto.idProducto
    }
    const actualizar$ = this.sucursalProductoService
      .actualizarPorId(
        sucursalProducto.idSucursalProducto,
        valoresAActualizar
      );
    actualizar$
      .subscribe(
        {
          next: (datos) => {
            //console.log({datos})
          },
          error: (error) => {
            console.error({error})
          }
        }
      )
  }
}
