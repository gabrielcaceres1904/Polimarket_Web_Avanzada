import { Component, OnInit } from '@angular/core';
import {ProductoAdminInterface} from "../../../servicios/interfaces/app/productoAdmin.interface";

@Component({
  selector: 'app-ruta-admin-productos',
  templateUrl: './ruta-admin-productos.component.html',
  styleUrls: ['./ruta-admin-productos.component.scss']
})
export class RutaAdminProductosComponent implements OnInit {
  productosSucursal: ProductoAdminInterface[] = [];
  prefix = 'https://bit.ly/'

  constructor() { }

  ngOnInit(): void {
  }

  actualizarStock(idProducto: any, adicional: any) {
    const idProd = Number.parseInt(idProducto)
    const add = Number.parseInt(adicional)
  }
}
