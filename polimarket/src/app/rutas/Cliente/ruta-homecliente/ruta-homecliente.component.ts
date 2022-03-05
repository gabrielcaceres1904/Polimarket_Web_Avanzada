import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ruta-homecliente',
  templateUrl: './ruta-homecliente.component.html',
  styleUrls: ['./ruta-homecliente.component.scss']
})
export class RutaHomeclienteComponent implements OnInit {

  idUsuario =-1

 constructor(private readonly router: Router,
             private readonly activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    const parametroRuta$ = this.activatedRoute.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idCliente'];
          //const ruta = '/cliente/' + this.idUsuario + '/home'
          //this.router.navigateByUrl(ruta,{ state: { idUsuario: this.idUsuario} });
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }
}
