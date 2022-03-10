import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaAdminPedidosComponent} from "../../rutas/Administrador/ruta-admin-pedidos/ruta-admin-pedidos.component";
import {PedidoDetalleInterface} from "../../servicios/interfaces/modelo/pedido-detalle.interface";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";
import {PedidoInterface} from "../../servicios/interfaces/modelo/pedido.interface";
import {ProductoInterface} from "../../servicios/interfaces/modelo/producto.interface";
import {DatePipe} from "@angular/common";
import {PedidoService} from "../../servicios/http/pedido.service";

@Component({
  selector: 'app-modal-detalle-pedido',
  templateUrl: './modal-detalle-pedido.component.html',
  styleUrls: ['./modal-detalle-pedido.component.scss']
})
export class ModalDetallePedidoComponent implements OnInit {
total=0;
listaProductos:PedidoDetalleInterface[]=[];
usuario!:UsuarioInterface;
pedido!:PedidoInterface;
productos:ProductoInterface[]=[];
listaPedidosActualizada:PedidoInterface[]=[]
  datePipe:DatePipe=new DatePipe('en-US');
  _mapProductoPedido:Map<number,ProductoInterface> =new Map<number, ProductoInterface>();
  constructor(
    public dialogRef:MatDialogRef<RutaAdminPedidosComponent>,
    private readonly pedioService:PedidoService,
    @Inject(MAT_DIALOG_DATA)
    private readonly datos:any
  ) { }

  ngOnInit(): void {
    this.usuario=this.datos.usuario;
    this.pedido=this.datos.pedido;
    this.listaProductos=this.datos.listaOfertas;
    let total=0;
    for(let producto of this.listaProductos){
      total+=producto.valorTotal;
    }
    this.total=total;
    this.productos=this.datos.productos;
    this.mapearPedidoProducto();
  }

  mapearPedidoProducto() {
    for (let detallePedido of this.listaProductos) {
      for (let producto of this.productos) {
        if (detallePedido.idProducto == producto.idProducto) {
          this._mapProductoPedido.set(detallePedido.idCompra, producto);
          break;
        }
      }
    }
  }
  prepararObjeto():PedidoInterface{
    if(this.pedido){
      const idPedido=this.pedido.idPedido;
      const fechaPedido=this.pedido.fechaPedido;
      const estado = "Entregado";
      const idUsuario=this.pedido.idUsuario;
      return {
        idPedido:idPedido,
        fechaPedido:fechaPedido,
        estado:estado,
        idUsuario:idUsuario
      }
    }
    return {
      idPedido:0,
      fechaPedido:new Date("01-01-2001"),
      estado:"Pendiente",
      idUsuario:0
    }
  }
  actualizarEstado(){
    const objetoActualizar = this.prepararObjeto();
    this.pedioService.actualizarPorId(this.pedido.idPedido,objetoActualizar)
      .subscribe(
        {
          next:(data)=>{
            this.cargarListaPedidosActualizados();
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{

          }
        }
      )
  }
  cargarListaPedidosActualizados(){
    this.pedioService.buscarTodos("")
      .subscribe(
        {
          next:(data)=>{
            if(data){
              this.listaPedidosActualizada=data;
            }
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            this.dialogRef.close(this.listaPedidosActualizada);
          }
        }
      )
  }
}
