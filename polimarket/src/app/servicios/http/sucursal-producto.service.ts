import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SucursalProductoInterface} from "../interfaces/modelo/sucursal-producto.interface";
import {SucursalProductoCreateInterface} from "../interfaces/create/sucursal-productoCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class SucursalProductoService {
  url = environment.urlJPC + '/Sucursal_Producto'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: SucursalProductoCreateInterface): Observable<SucursalProductoInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalProductoInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<SucursalProductoInterface[]>{
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
          (resultadoEnData) => resultadoEnData as SucursalProductoInterface[]
        )
      );
  }
  buscarUno(idSucursalProducto: number):Observable<SucursalProductoInterface>{
    return this.httpClient
      .get(this.url + '/' + idSucursalProducto)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalProductoInterface
        )
      );
  }

  actualizarPorId(idSucursalProducto:number, datosActualizar: SucursalProductoCreateInterface): Observable<SucursalProductoInterface>{
    return this.httpClient.put(this.url  + '/' + idSucursalProducto, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalProductoInterface
        )
      )
  }

  eliminarPorId(idSucursalProducto:number):Observable<SucursalProductoInterface>{
    return this.httpClient.delete(this.url  + '/' + idSucursalProducto)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as SucursalProductoInterface
        )
      )
  }
}
