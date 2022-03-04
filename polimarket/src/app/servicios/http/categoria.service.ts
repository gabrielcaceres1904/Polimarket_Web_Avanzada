import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProductoCreateInterface} from "../interfaces/create/productoCreate.interface";
import {map, Observable} from "rxjs";
import {ProductoInterface} from "../interfaces/modelo/producto.interface";
import {CategoriaInterface} from "../interfaces/modelo/categoria.interface";
import {CategoriaCreateInterface} from "../interfaces/create/categoriaCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = environment.urlJPC + '/Categorias'

  constructor(private readonly httpClient: HttpClient) {

  }

  crear(entidad: CategoriaCreateInterface): Observable<CategoriaInterface>{
    return this.httpClient.post(this.url,entidad,{})
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as CategoriaInterface
        )
      );
  }

  buscarTodos(parametrosConsulta?:any): Observable<CategoriaInterface[]>{
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
          (resultadoEnData) => resultadoEnData as CategoriaInterface[]
        )
      );
  }
  buscarUno(idCategoria: number):Observable<CategoriaInterface>{
    return this.httpClient
      .get(this.url + '/' + idCategoria)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as CategoriaInterface
        )
      );
  }

  actualizarPorId(idCategoria:number, datosActualizar: CategoriaCreateInterface): Observable<CategoriaInterface>{
    return this.httpClient.put(this.url  + '/' + idCategoria, datosActualizar)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as CategoriaInterface
        )
      )
  }

  eliminarPorId(idCategoria:number):Observable<CategoriaInterface>{
    return this.httpClient.delete(this.url  + '/' + idCategoria)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as CategoriaInterface
        )
      )
  }
}
