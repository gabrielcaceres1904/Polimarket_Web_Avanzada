import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ruta-perfil',
  templateUrl: './ruta-perfil.component.html',
  styleUrls: ['./ruta-perfil.component.scss']
})
export class RutaPerfilComponent implements OnInit {

  idUsuario = -1

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) {

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

}
