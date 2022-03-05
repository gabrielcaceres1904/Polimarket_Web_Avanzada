import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PedidoDetalleInterface} from "../interfaces/modelo/pedido-detalle.interface";
import {PedidoDetalleCreateInterface} from "../interfaces/create/pedido-detalleCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class PedidoDetalleService {
  url = environment.urlJPC + '/Pedido_Detalle'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: PedidoDetalleCreateInterface): Observable<PedidoDetalleInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoDetalleInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<PedidoDetalleInterface[]>{
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
          (resultadoEnData) => resultadoEnData as PedidoDetalleInterface[]
        )
      );
  }
  buscarUno(idPedidoDetalle: number):Observable<PedidoDetalleInterface>{
    return this.httpClient
      .get(this.url + '/' + idPedidoDetalle)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoDetalleInterface
        )
      );
  }

  actualizarPorId(idPedidoDetalle:number, datosActualizar: PedidoDetalleCreateInterface): Observable<PedidoDetalleInterface>{
    return this.httpClient.put(this.url  + '/' + idPedidoDetalle, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoDetalleInterface
        )
      )
  }

  eliminarPorId(idPedidoDetalle:number):Observable<PedidoDetalleInterface>{
    return this.httpClient.delete(this.url  + '/' + idPedidoDetalle)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PedidoDetalleInterface
        )
      )
  }
}
