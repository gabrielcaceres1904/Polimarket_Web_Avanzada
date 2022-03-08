import {PedidoInterface} from "../modelo/pedido.interface";
import {PedidoDetalleInterface} from "../modelo/pedido-detalle.interface";

export interface PedidoAdminInterface {
  pedido: PedidoInterface,
  total: number,
  detalle: PedidoDetalleInterface[]
}
