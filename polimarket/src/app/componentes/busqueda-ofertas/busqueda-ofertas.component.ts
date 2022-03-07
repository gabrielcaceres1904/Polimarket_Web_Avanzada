import {Component, Input, OnInit} from '@angular/core';
import {SucursalInterface} from "../../servicios/interfaces/modelo/sucursal.interface";

@Component({
  selector: 'app-busqueda-ofertas',
  templateUrl: './busqueda-ofertas.component.html',
  styleUrls: ['./busqueda-ofertas.component.scss']
})
export class BusquedaOfertasComponent implements OnInit {
  @Input()
  sucursales: SucursalInterface[] = [];

  constructor() {
    this.sucursales.push(
      {
        idSucursal: 1,
        direccion: 'Guamani',
        idUsuario: 1
      },
      {
        idSucursal: 2,
        direccion: 'El Recreo',
        idUsuario: 2
      }
    )
  }

  ngOnInit(): void {
  }

  botonBuscar() {

  }

  selectChangeHandler(event: any) {
    const valor = event.target.value;
  }

  botonNuevo() {

  }
}
