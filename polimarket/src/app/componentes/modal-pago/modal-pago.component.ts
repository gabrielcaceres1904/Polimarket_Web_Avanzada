import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaListaProductosComponent} from "../../rutas/Cliente/ruta-lista-productos/ruta-lista-productos.component";
import {RutaCarritoComponent} from "../../rutas/Cliente/ruta-carrito/ruta-carrito.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../servicios/interfaces/app/base-control.interface";

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss']
})
export class ModalPagoComponent implements OnInit {

  formGroup: FormGroup

  campos = [
    {
      titulo: 'Tarjeta de crédito o débito', nombre: 'tarjeta', tipo: 'text', placeholder: 'Ingresa el número de tu tarjeta', requeridoM: 'El número de tarjeta es requerido', longitudM: 'Longitud mínima de 16 números sin espacios'
    },
    {
      titulo: 'CVV', nombre: 'cvv', tipo: 'text', placeholder: 'Ingresa los 3 números de atrás', requeridoM: 'El CVV es requerido', longitudM: 'El CVV debe tener una longitud de 3 números'
    }
  ] as baseControlInterface[]

  tarjeta = ''

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              public dialogRef: MatDialogRef<RutaCarritoComponent>,
              private readonly formBuilder: FormBuilder,) {
    this.formGroup =this.formBuilder.group(
      {
        tarjeta: ['', Validators.required],
        fechaExpiracion: ['', Validators.required],
        cvv: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
  }

  ingresarTarjeta() {
    this.dialogRef.close({tarjeta: this.tarjeta})
  }

  cancelar() {
    this.dialogRef.close()
  }
}
