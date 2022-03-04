import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductoInterface} from "../interfaces/modelo/producto.interface";
import {ProductoCreateInterface} from "../interfaces/create/productoCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = environment.urlJPC + '/Productos'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: ProductoCreateInterface): Observable<ProductoInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as ProductoInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<ProductoInterface[]>{
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
          (resultadoEnData) => resultadoEnData as ProductoInterface[]
        )
      );
  }
  buscarUno(idProducto: number):Observable<ProductoInterface>{
    return this.httpClient
      .get(this.url + '/' + idProducto)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as ProductoInterface
        )
      );
  }

  actualizarPorId(idProducto:number, datosActualizar: ProductoCreateInterface): Observable<ProductoInterface>{
    return this.httpClient.put(this.url  + '/' + idProducto, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as ProductoInterface
        )
      )
  }

  eliminarPorId(idProducto:number):Observable<ProductoInterface>{
    return this.httpClient.delete(this.url  + '/' + idProducto)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as ProductoInterface
        )
      )
  }
}
