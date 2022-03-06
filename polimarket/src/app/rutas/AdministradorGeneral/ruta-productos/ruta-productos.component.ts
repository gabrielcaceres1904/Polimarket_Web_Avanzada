import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ruta-productos',
  templateUrl: './ruta-productos.component.html',
  styleUrls: ['./ruta-productos.component.scss']
})
export class RutaProductosComponent implements OnInit {

  constructor(
    private readonly activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const parametrosConsulta$ = this.activatedRoute.queryParams;
    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          //console.log(queryParams);
          // this.categoriaSeleccionada = queryParams['categoria']
          // if(this.categoriaSeleccionada != undefined){
          //   this.buscarProductos(Number.parseInt(this.categoriaSeleccionada))
          // }
        },
        error: (error)=>{
          console.error(error)
        },
      }
    )
  }

}
