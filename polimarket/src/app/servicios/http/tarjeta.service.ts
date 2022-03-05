import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TarjetaInterface} from "../interfaces/modelo/tarjeta.interface";
import {TarjetaCreateInterface} from "../interfaces/create/tarjetaCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  url = environment.urlJPC + '/TarjetasCredito'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: TarjetaCreateInterface): Observable<TarjetaInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as TarjetaInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<TarjetaInterface[]>{
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
          (resultadoEnData) => resultadoEnData as TarjetaInterface[]
        )
      );
  }
  buscarUno(idTarjeta: number):Observable<TarjetaInterface>{
    return this.httpClient
      .get(this.url + '/' + idTarjeta)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as TarjetaInterface
        )
      );
  }

  actualizarPorId(idTarjeta:number, datosActualizar: TarjetaCreateInterface): Observable<TarjetaInterface>{
    return this.httpClient.put(this.url  + '/' + idTarjeta, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as TarjetaInterface
        )
      )
  }

  eliminarPorId(idTarjeta:number):Observable<TarjetaInterface>{
    return this.httpClient.delete(this.url  + '/' + idTarjeta)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as TarjetaInterface
        )
      )
  }
}
