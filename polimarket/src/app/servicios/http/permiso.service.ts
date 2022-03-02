import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PermisoCreateInterface} from "../interfaces/create/permisoCreate.interface";
import {PermisoInterface} from "../interfaces/modelo/permiso.interface";

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  url = environment.urlJPC + '/Permisos'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: PermisoCreateInterface): Observable<PermisoInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PermisoInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<PermisoInterface[]>{
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
          (resultadoEnData) => resultadoEnData as PermisoInterface[]
        )
      );
  }
  buscarUno(idPermiso: number):Observable<PermisoInterface>{
    return this.httpClient
      .get(this.url + '/' + idPermiso)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PermisoInterface
        )
      );
  }

  actualizarPorId(idPermiso:number, datosActualizar: PermisoCreateInterface): Observable<PermisoInterface>{
    return this.httpClient.put(this.url  + '/' + idPermiso, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PermisoInterface
        )
      )
  }

  eliminarPorId(idPermiso:number):Observable<PermisoInterface>{
    return this.httpClient.delete(this.url  + '/' + idPermiso)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as PermisoInterface
        )
      )
  }
}
