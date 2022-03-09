import {Component, Input, OnInit} from '@angular/core';
import {SucursalService} from "../../servicios/http/sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaInterface} from "../../servicios/interfaces/modelo/categoria.interface";
import {CategoriaService} from "../../servicios/http/categoria.service";

@Component({
  selector: 'app-busqueda-sucursal-productos',
  templateUrl: './busqueda-sucursal-productos.component.html',
  styleUrls: ['./busqueda-sucursal-productos.component.scss']
})
export class BusquedaSucursalProductosComponent implements OnInit {

  @Input()
  sucursalSeleccionada = -1
  @Input()
  idUsuario = -1

  //Busqueda
  busqueda = ''
  categoriaSeleccionada = -1
  categorias: CategoriaInterface[] = [];

  constructor(private readonly sucursalService: SucursalService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly categoriasService: CategoriaService) {
    this.buscarCategorias()
  }

  ngOnInit(): void {
    const parametrosConsulta$ = this.activatedRoute.queryParams;

    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          //console.log(queryParams);
          this.categoriaSeleccionada = Number.parseInt(queryParams['categoria'])
          const busquedaOferta = this.busqueda = queryParams['nombre']
          if(busquedaOferta === undefined){
            let valorOferta = <HTMLInputElement> document.getElementById("busquedaOferta");
            valorOferta.value = ''
          }
        },
        error: (error)=>{
          console.error(error)
        },
      }
    )

    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdmin'];
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }

  botonBuscar() {
    let valor = <HTMLInputElement> document.getElementById("busquedaOferta");
    this.busqueda = valor.value;
    //console.log(this.categoriaSeleccionada)
    //console.log(this.busqueda)
    if(this.busqueda != ''){
      if(this.categoriaSeleccionada === 0 || isNaN(this.categoriaSeleccionada)){
        //console.log('Component Caso 1')
        this.router.navigate(
          ['/admin', this.idUsuario, 'productos'],
          {
            queryParams: {
              nombre: this.busqueda
            }
          }
        )
      }else{
        //console.log('Component Caso 2')
        this.router.navigate(
          ['/admin', this.idUsuario, 'productos'],
          {
            queryParams: {
              categoria: this.categoriaSeleccionada,
              nombre: this.busqueda
            }
          }
        )
      }
    }else{
      if(this.categoriaSeleccionada != 0 && !isNaN(this.categoriaSeleccionada)){
        //console.log('Component Caso 3')
        this.router.navigate(
          ['/admin', this.idUsuario, 'productos'],
          {
            queryParams: {
              categoria: this.categoriaSeleccionada,
            }
          }
        )
      }else{
        this.router.navigate(
          ['/admin', this.idUsuario, 'productos'],
          {
            queryParams: {

            }
          }
        )
      }
    }
  }

  busquedaCategoria(event: any) {
    const valor = Number.parseInt(event.target.value)
    this.categoriaSeleccionada = valor
    //console.log(valor)
    if(valor != 0){
      this.navegarSucursal()
    }
  }

  navegarSucursal(){
    if(this.categoriaSeleccionada != 0){
      if(this.busqueda != ''){
        this.router.navigate(
          ['/admin', this.idUsuario, 'productos'],
          {
            queryParams: {
              categoria: this.categoriaSeleccionada,
              nombre: this.busqueda
            }
          }
        )
      }else{
        this.router.navigate(
          ['/admin', this.idUsuario, 'productos'],
          {
            queryParams: {
              categoria: this.categoriaSeleccionada,
            }
          }
        )
      }
    }else{

    }
  }

  private buscarCategorias() {
    this.categoriasService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            this.categorias = datos as CategoriaInterface[]
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }
}
