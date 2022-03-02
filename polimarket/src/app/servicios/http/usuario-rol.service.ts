import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PermisoCreateInterface} from "../interfaces/create/permisoCreate.interface";
import {map, Observable} from "rxjs";
import {PermisoInterface} from "../interfaces/modelo/permiso.interface";
import {UsuarioRolInterface} from "../interfaces/modelo/usuario-rol.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {
  url = environment.urlJPC + '/Usuario_Rol'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: UsuarioRolInterface): Observable<UsuarioRolInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioRolInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<UsuarioRolInterface[]>{
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
          (resultadoEnData) => resultadoEnData as UsuarioRolInterface[]
        )
      );
  }
  buscarRolDeUsuario(idUsuario: number):Observable<UsuarioRolInterface>{
    return this.httpClient
      .get(this.url + '/' + idUsuario)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioRolInterface
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
