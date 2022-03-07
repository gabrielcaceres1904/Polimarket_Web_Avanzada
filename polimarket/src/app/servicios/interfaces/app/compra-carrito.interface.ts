import {ProductoInterface} from "../modelo/producto.interface";

export interface CompraCarritoInterface {
  producto: ProductoInterface,
  cantidad: number
  stock: number
  idSucursal: number
}
