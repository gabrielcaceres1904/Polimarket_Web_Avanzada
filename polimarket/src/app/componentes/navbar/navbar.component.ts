import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from "../../servicios/global/global-data.service";
import {Router} from "@angular/router";
import {UsuarioInterface} from "../../servicios/interfaces/modelo/usuario.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly router: Router,) { }

  ngOnInit(): void {
  }

  verPerfil() {
    const ruta = ['/cliente', 'perfil'];
    this.router.navigate(ruta);
  }

  verCarrito() {
    const ruta = ['/cliente', 'carrito'];
    this.router.navigate(ruta);
  }

  verResumenMensual() {
    const ruta = ['/cliente', 'resumen'];
    this.router.navigate(ruta);
  }

  cerrarSesion() {
    GlobalDataService.cerrarSesion()
    const ruta = ['/login'];
    this.router.navigate(ruta);
  }
}
