import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PermisoCreateInterface} from "../interfaces/create/permisoCreate.interface";
import {map, Observable} from "rxjs";
import {PermisoInterface} from "../interfaces/modelo/permiso.interface";
import {UsuarioRolInterface} from "../interfaces/modelo/usuario-rol.interface";
import {UsuarioRolCreateInterface} from "../interfaces/create/usuarioRolCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {
  url = environment.urlJPC + '/Usuario_Rol'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: UsuarioRolCreateInterface): Observable<UsuarioRolInterface>{
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

  buscarRolDeUsuario(idUsuarioRol: number):Observable<UsuarioRolInterface>{
    return this.httpClient
      .get(this.url + '/' + idUsuarioRol)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioRolInterface
        )
      );
  }

  actualizarPorId(idUsuarioRol:number, datosActualizar: UsuarioRolCreateInterface): Observable<UsuarioRolInterface>{
    return this.httpClient.put(this.url  + '/' + idUsuarioRol, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioRolInterface
        )
      )
  }

  eliminarPorId(idUsuarioRol:number):Observable<UsuarioRolInterface>{
    return this.httpClient.delete(this.url  + '/' + idUsuarioRol)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioRolInterface
        )
      )
  }
}
