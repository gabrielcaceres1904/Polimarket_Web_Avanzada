import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from "../../servicios/global/global-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  idUsuario = -1

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const parametroRuta$ = this.activatedRoute.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idCliente'];
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }

  verPerfil() {
    const ruta = ['/cliente', this.idUsuario, 'perfil'];
    this.router.navigate(ruta);
  }

  verCarrito() {
    const ruta = ['/cliente', this.idUsuario, 'carrito'];
    this.router.navigate(ruta);
  }

  verResumenMensual() {
    const ruta = ['/cliente', this.idUsuario, 'resumen'];
    this.router.navigate(ruta);
  }

  cerrarSesion() {
    const ruta = ['/login'];
    this.router.navigate(ruta);
  }

  volverHome() {
    const ruta = ['/cliente', this.idUsuario, 'home'];
    this.router.navigate(ruta,
      {
        queryParams: {
          sucursal: 1
        }
      });
  }
}
