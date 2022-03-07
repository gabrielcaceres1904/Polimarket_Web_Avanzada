import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalDataService} from "../../servicios/global/global-data.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  tituloSideBar="Categorías"
  @Input()
  categories: {
    idCategoria: number,
    categoria: string,
    cantProductos: number
  }[] = []

  idUsuario = -1
  sucursalSeleccionada = -1

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) { }

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

    const parametrosConsulta$ = this.activatedRoute.queryParams;

    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          //console.log(queryParams);
          if(queryParams['sucursal'] != undefined){
            this.sucursalSeleccionada = Number.parseInt(queryParams['sucursal'])
          }else{
            this.sucursalSeleccionada = 0
          }
        },
        error: (error)=>{
          console.error(error)
        },
      }
    )

  }

  actualizarProductos(categoria: any) {
    if(GlobalDataService.usuarioActual)
    this.router.navigate(
      ['/cliente', this.idUsuario, 'home'],
      {
        queryParams: {
          categoria: categoria,
          sucursal: this.sucursalSeleccionada
        }
      }
    )
  }
}
