import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  idUsuario = -1
  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const parametroRuta$ = this.activatedRoute.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdmin'];
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }
  verPerfil() {
    const ruta = ['/admin-general', this.idUsuario, 'perfil'];
    this.router.navigate(ruta);
  }
  cerrarSesion() {
    const ruta = ['/login'];
    this.router.navigate(ruta);
  }
}
