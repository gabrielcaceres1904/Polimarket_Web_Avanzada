import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RolCreateInterface} from "../interfaces/create/rolCreate.interface";
import {map, Observable} from "rxjs";
import {RolInterface} from "../interfaces/modelo/rol.interface";

@Injectable({
  providedIn: 'root'
})
export class RolService{

  url = environment.urlJPC + '/Roles'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: RolCreateInterface): Observable<RolInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as RolInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<RolInterface[]>{
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
          (resultadoEnData) => resultadoEnData as RolInterface[]
        )
      );
  }
  buscarUno(idRol: number):Observable<RolInterface>{
    return this.httpClient
      .get(this.url + '/' + idRol)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as RolInterface
        )
      );
  }

  actualizarPorId(idRol:number, datosActualizar: RolCreateInterface): Observable<RolInterface>{
    return this.httpClient.put(this.url  + '/' + idRol, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as RolInterface
        )
      )
  }

  eliminarPorId(idRol:number):Observable<RolInterface>{
    return this.httpClient.delete(this.url  + '/' + idRol)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as RolInterface
        )
      )
  }

}
