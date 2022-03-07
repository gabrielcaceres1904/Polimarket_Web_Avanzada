import {Component, Input, OnInit} from '@angular/core';
import {SucursalInterface} from "../../servicios/interfaces/modelo/sucursal.interface";
import {SucursalService} from "../../servicios/http/sucursal.service";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-busqueda-ofertas',
  templateUrl: './busqueda-ofertas.component.html',
  styleUrls: ['./busqueda-ofertas.component.scss']
})
export class BusquedaOfertasComponent implements OnInit {
  @Input()
  sucursales: SucursalInterface[] = [];

  sucursalActual: SucursalInterface = {} as SucursalInterface
  idUsuario = -1

  constructor(private readonly sucursalService: SucursalService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) {
    this.sucursales.push(
      {
        idSucursal: 1,
        direccion: 'Guamani',
        idUsuario: 1
      },
      {
        idSucursal: 2,
        direccion: 'El Recreo',
        idUsuario: 2
      }
    )
  }

  ngOnInit(): void {
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

  }

  actualizarBusqueda(event: any) {
    const valor = Number.parseInt(event.target.value)
    console.log(valor)
    if(valor != 0){
      this.sucursalService.buscarUno(valor)
        .subscribe(
          {
            next: (data) => {
              this.sucursalActual = data as SucursalInterface
              this.router.navigate(
                ['/cliente', this.idUsuario, 'home'],
                {
                  queryParams: {
                    sucursal: this.sucursalActual.idSucursal
                  }
                }
              )
            },
            error: (error) => {
              console.error(error)
            }
          }
        )
    }else{
      this.router.navigate(
        ['/cliente', this.idUsuario, 'home'],
        {
          queryParams: {
            sucursal: 0
          }
        }
      )
    }
  }

  botonNuevo() {

  }
}
