import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ruta-resumen',
  templateUrl: './ruta-resumen.component.html',
  styleUrls: ['./ruta-resumen.component.scss']
})
export class RutaResumenComponent implements OnInit {

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
