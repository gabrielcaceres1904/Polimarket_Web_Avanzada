import { Component, OnInit } from '@angular/core';
import {PedidoAdminInterface} from "../../../servicios/interfaces/app/pedidoAdmin.interface";
import {PedidoDetalleInterface} from "../../../servicios/interfaces/modelo/pedido-detalle.interface";
import {MatDialog} from "@angular/material/dialog";
import {PedidoService} from "../../../servicios/http/pedido.service";
import {PedidoDetalleService} from "../../../servicios/http/pedidoDetalle.service";
import {PedidoInterface} from "../../../servicios/interfaces/modelo/pedido.interface";
import {ModalDetallePedidoComponent} from "../../../componentes/modal-detalle-pedido/modal-detalle-pedido.component";

@Component({
  selector: 'app-ruta-admin-pedidos',
  templateUrl: './ruta-admin-pedidos.component.html',
  styleUrls: ['./ruta-admin-pedidos.component.scss']
})
export class RutaAdminPedidosComponent implements OnInit {
  listaPedidos:PedidoInterface[]=[]
  listaOfertasDePedido:PedidoDetalleInterface[]=[]
  listaTotalesPedidos:number[]=[]
  constructor(
    public dialog:MatDialog,
    private readonly pedidoService:PedidoService,
    private readonly pedidoDetalle:PedidoDetalleService
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
    this.dialog.open(ModalDetallePedidoComponent,
      {
        height:"80%",
        width:"65%"
      })
  }
}
