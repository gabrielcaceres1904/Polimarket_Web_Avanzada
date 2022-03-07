import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PedidoInterface} from "../interfaces/modelo/pedido.interface";
import {PedidoCreateInterface} from "../interfaces/create/pedidoCreate.interface";
import {SucursalInterface} from "../interfaces/modelo/sucursal.interface";
import {SucursalCreateInterface} from "../interfaces/create/sucursalCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  url = environment.urlJPC + '/Sucursales'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: SucursalCreateInterface): Observable<SucursalInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<SucursalInterface[]>{
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
          (resultadoEnData) => resultadoEnData as SucursalInterface[]
        )
      );
  }
  buscarUno(idSucursal: number):Observable<SucursalInterface>{
    return this.httpClient
      .get(this.url + '/' + idSucursal)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalInterface
        )
      );
  }

  actualizarPorId(idSucursal:number, datosActualizar: SucursalCreateInterface): Observable<SucursalInterface>{
    return this.httpClient.put(this.url  + '/' + idSucursal, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalInterface
        )
      )
  }

  eliminarPorId(idSucursal:number):Observable<SucursalInterface>{
    return this.httpClient.delete(this.url  + '/' + idSucursal)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalInterface
        )
      )
  }
}
