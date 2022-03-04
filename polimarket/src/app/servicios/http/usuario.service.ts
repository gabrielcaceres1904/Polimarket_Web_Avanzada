import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UsuarioCreateInterface} from "../interfaces/create/usuarioCreate.interface";
import {UsuarioInterface} from "../interfaces/modelo/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = environment.urlJPC + '/Usuarios'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: UsuarioCreateInterface): Observable<UsuarioInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<UsuarioInterface[]>{
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
          (resultadoEnData) => resultadoEnData as UsuarioInterface[]
        )
      );
  }
  buscarUno(idUsuario: number):Observable<UsuarioInterface>{
    return this.httpClient
      .get(this.url + '/' + idUsuario)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioInterface
        )
      );
  }

  actualizarPorId(idUsuario:number, datosActualizar: UsuarioCreateInterface): Observable<UsuarioInterface>{
    return this.httpClient.put(this.url  + '/' + idUsuario, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioInterface
        )
      )
  }

  eliminarPorId(idUsuario:number):Observable<UsuarioInterface>{
    return this.httpClient.delete(this.url  + '/' + idUsuario)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UsuarioInterface
        )
      )
  }
}
