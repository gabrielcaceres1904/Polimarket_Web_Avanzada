import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaListaProductosComponent} from "../../rutas/Cliente/ruta-lista-productos/ruta-lista-productos.component";
import {ProductoInterface} from "../../servicios/interfaces/modelo/producto.interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  prefix = 'https://bit.ly/'
  cantidad: any;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              public dialogRef: MatDialogRef<RutaListaProductosComponent>) {

  }

  ngOnInit(): void {
    //console.log(this.data)
  }

  agregarProducto(){
    this.dialogRef.close({cantidad: this.cantidad})
  }

  cancelar() {
    this.dialogRef.close()
  }
}
