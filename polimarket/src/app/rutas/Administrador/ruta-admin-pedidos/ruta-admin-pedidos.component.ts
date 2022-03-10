import { Component, OnInit } from '@angular/core';
import {PedidoAdminInterface} from "../../../servicios/interfaces/app/pedidoAdmin.interface";
import {PedidoDetalleInterface} from "../../../servicios/interfaces/modelo/pedido-detalle.interface";
import {MatDialog} from "@angular/material/dialog";
import {PedidoService} from "../../../servicios/http/pedido.service";
import {PedidoDetalleService} from "../../../servicios/http/pedidoDetalle.service";
import {PedidoInterface} from "../../../servicios/interfaces/modelo/pedido.interface";
import {ModalDetallePedidoComponent} from "../../../componentes/modal-detalle-pedido/modal-detalle-pedido.component";
import {ProductoService} from "../../../servicios/http/producto.service";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";
import {ProductoInterface} from "../../../servicios/interfaces/modelo/producto.interface";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-ruta-admin-pedidos',
  templateUrl: './ruta-admin-pedidos.component.html',
  styleUrls: ['./ruta-admin-pedidos.component.scss']
})
export class RutaAdminPedidosComponent implements OnInit {
  listaPedidos:PedidoInterface[]=[]
  listaOfertasDePedido:PedidoDetalleInterface[]=[]
  listaTotalesPedidos:number[]=[]
  listaProductos:ProductoInterface[]=[]
  usuario!:UsuarioInterface;
  datePipe:DatePipe=new DatePipe('en-US');
  constructor(
    public dialog:MatDialog,
    private readonly pedidoService:PedidoService,
    private readonly pedidoDetalle:PedidoDetalleService,
    private readonly productoService:ProductoService,
    private readonly userService:UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }
  cargarPedidos(){
    let listaPedidosTemp:PedidoInterface[]=[];
    let listaTotalesPedidos:number[]=[]
    this.pedidoService.buscarTodos("")
      .subscribe(
        {
          next:(data)=>{
            if(data){
              console.log("pedidos:",listaPedidosTemp);
              listaPedidosTemp=data;
            }
          },
          error:(error)=>{

          },
          complete:()=>{
            this.pedidoDetalle.buscarTodos("")
              .subscribe(
                {
                  next:(data)=>{
                    if(data){
                      let contador=0;
                      let totalPedido=0;
                      for(let compra of data){
                        if(contador===0){
                          totalPedido+=compra.valorTotal;
                        }
                        if(contador>=1){
                          if(data[contador-1].idPedido===compra.idPedido){
                            totalPedido+=compra.valorTotal;
                            if(contador===data.length-1){
                              listaTotalesPedidos.push(totalPedido);
                            }
                          }else{
                            listaTotalesPedidos.push(totalPedido);
                            totalPedido=compra.valorTotal;
                          }
                        }
                        console.log("compra",compra);
                        console.log("total:",totalPedido);
                        contador++;
                      }
                    }
                  },
                  error:(error)=>{

                  },
                  complete:()=>{
                    console.log("tamaño pedidos:",listaPedidosTemp.length);
                    console.log("tamaño totlaes",listaTotalesPedidos.length);
                    if(listaPedidosTemp.length===listaTotalesPedidos.length){
                      this.listaPedidos=listaPedidosTemp;
                      this.listaTotalesPedidos=listaTotalesPedidos;
                    }
                  }
                }
              )
          }
        }
      )
  }
  verDetalle(pedido:PedidoInterface){
    this.pedidoDetalle.buscarTodos("")
      .subscribe(
        {
          next:(data)=>{
            if(data){
              //cargando los detalles del pedido seleccionado
              for(let detalle of data){
                if(detalle.idPedido===pedido.idPedido){
                  this.listaOfertasDePedido.push(detalle);
                }
              }
              console.log("listaOfertasPedido",this.listaOfertasDePedido);
            }
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            //se carga una lista de los nombres de los productos de los detalles
            for(let i=0;i<this.listaOfertasDePedido.length;i++){
              this.productoService.buscarUno(this.listaOfertasDePedido[i].idProducto)
                .subscribe(
                  {
                    next:(data)=>{
                      if(data){
                        console.log("pedido producto",data);
                        this.listaProductos.push(data);
                      }
                    },
                    error:(error)=>{

                    },
                    complete:()=>{
                      if(i===this.listaOfertasDePedido.length-1){
                        this.userService.buscarUno(pedido.idUsuario)
                          .subscribe(
                            {
                              next:(data)=>{
                                if(data){
                                  this.usuario=data;
                                }
                              },
                              error:(error)=>{
                                console.log(error);
                              },
                              complete:()=>{
                               const afterClosed = this.dialog.open(ModalDetallePedidoComponent,
                                  {
                                    data:{usuario:this.usuario,pedido:pedido,listaOfertas:this.listaOfertasDePedido,productos:this.listaProductos},
                                    height:"80%",
                                    width:"65%"
                                  });
                               afterClosed.afterClosed()
                                 .subscribe(
                                   {
                                     next:(data)=>{
                                       this.listaOfertasDePedido=[]
                                       this.listaProductos=[];
                                       this.usuario={idUsuario:0,nombre:"",apellido:"",email:"",direccion:"",password:""};
                                       if(data){
                                         this.listaPedidos=data;
                                       }
                                     },
                                     error:()=>{

                                     }
                                   }
                                 )
                              }
                            }
                          )

                      }
                    }
                  }
                )
            }
          }
        }
      );

  }
}
