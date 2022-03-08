import {Component, OnInit} from '@angular/core';
import {SucursalInterface} from "../../servicios/interfaces/modelo/sucursal.interface";
import {SucursalService} from "../../servicios/http/sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-busqueda-ofertas',
  templateUrl: './busqueda-ofertas.component.html',
  styleUrls: ['./busqueda-ofertas.component.scss']
})
export class BusquedaOfertasComponent implements OnInit {

  sucursales: SucursalInterface[] = [];

  sucursalActual: SucursalInterface = {} as SucursalInterface
  idUsuario = -1
  categoriaSeleccionada = -1
  sucursalSeleccionada =-1
  busqueda = ''

  constructor(private readonly sucursalService: SucursalService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) {
    this.buscarSucursales()
  }

  ngOnInit(): void {
    const parametrosConsulta$ = this.activatedRoute.queryParams;

    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          //console.log(queryParams);
          this.categoriaSeleccionada = Number.parseInt(queryParams['categoria'])
          this.sucursalSeleccionada = Number.parseInt(queryParams['sucursal'])
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
          this.idUsuario = parametrosRuta['idCliente'];
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }

  botonBuscar() {
    let valor = <HTMLInputElement> document.getElementById("busquedaOferta");
    this.busqueda = valor.value;
    if(this.busqueda != ''){
      this.router.navigate(
        ['/cliente', this.idUsuario, 'home'],
        {
          queryParams: {
            categoria: this.categoriaSeleccionada,
            sucursal: this.sucursalSeleccionada,
            nombre: this.busqueda
          }
        }
      )
    }else{
      this.router.navigate(
        ['/cliente', this.idUsuario, 'home'],
        {
          queryParams: {
            categoria: this.categoriaSeleccionada,
            sucursal: this.sucursalSeleccionada,
          }
        }
      )
    }
  }

  actualizarBusqueda(event: any) {
    let valorOferta = <HTMLInputElement> document.getElementById("busquedaOferta");
    valorOferta.value = ''
    const valor = Number.parseInt(event.target.value)
    //console.log(valor)
    if(valor != 0){
      this.sucursalService.buscarUno(valor)
        .subscribe(
          {
            next: (data) => {
              this.sucursalActual = data as SucursalInterface
            },
            error: (error) => {
              console.error(error)
            },
            complete: () => {
              this.navegarSucursal(this.sucursalActual.idSucursal)
            }
          }
        )
    }else{
      this.navegarSucursal(0)
    }
  }

  navegarSucursal(sucursal:number){
    if(this.categoriaSeleccionada != -1){
      this.router.navigate(
        ['/cliente', this.idUsuario, 'home'],
        {
          queryParams: {
            categoria: this.categoriaSeleccionada,
            sucursal: sucursal
          }
        }
      )
    }else{
      this.router.navigate(
        ['/cliente', this.idUsuario, 'home'],
        {
          queryParams: {
            sucursal: sucursal
          }
        }
      )
    }
  }

  botonNuevo() {

  }

  private buscarSucursales() {
    this.sucursalService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            this.sucursales = datos as SucursalInterface[]
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }
}
