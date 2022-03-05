import {Injectable} from "@angular/core";
import {CompraCarritoInterface} from "../interfaces/app/compra-carrito.interface";
import {UsuarioInterface} from "../interfaces/modelo/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  public static comprasCarrito: CompraCarritoInterface[] = []
  public static usuarioActual: UsuarioInterface = {} as UsuarioInterface

}
