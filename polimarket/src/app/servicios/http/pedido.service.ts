import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PedidoInterface} from "../interfaces/modelo/pedido.interface";
import {PedidoCreateInterface} from "../interfaces/create/pedidoCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url = environment.urlJPC + '/Pedidos'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: PedidoCreateInterface): Observable<PedidoInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<PedidoInterface[]>{
    Object
      .keys(parametrosConsulta)
      .forEach( k => {
        if(!parametrosConsulta[k]){
          delete parametrosConsulta[k]
        }
      })
    return this.httpClient
      .get(
        this.url,
        {
          params: parametrosConsulta
        }
      )
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoInterface[]
        )
      );
  }
  buscarUno(idPedido: number):Observable<PedidoInterface>{
    return this.httpClient
      .get(this.url + '/' + idPedido)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoInterface
        )
      );
  }

  actualizarPorId(idPedido:number, datosActualizar: PedidoCreateInterface): Observable<PedidoInterface>{
    return this.httpClient.put(this.url  + '/' + idPedido, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoInterface
        )
      )
  }

  eliminarPorId(idPedido:number):Observable<PedidoInterface>{
    return this.httpClient.delete(this.url  + '/' + idPedido)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoInterface
        )
      )
  }
}
