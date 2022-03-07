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

  }

  actualizarProductos(categoria: any) {
    if(GlobalDataService.usuarioActual)
    this.router.navigate(
      ['/cliente', this.idUsuario, 'home'],
      {
        queryParams: {
          categoria: categoria
        }
      }
    )
  }
}
