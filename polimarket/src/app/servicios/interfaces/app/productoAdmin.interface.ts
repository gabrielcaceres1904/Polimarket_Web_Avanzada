import {ProductoInterface} from "../modelo/producto.interface";

export interface ProductoAdminInterface {
  producto: ProductoInterface
  stock: number
  adicional: number
}
