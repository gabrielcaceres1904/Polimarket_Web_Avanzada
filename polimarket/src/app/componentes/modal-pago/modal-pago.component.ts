import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaListaProductosComponent} from "../../rutas/Cliente/ruta-lista-productos/ruta-lista-productos.component";
import {RutaCarritoComponent} from "../../rutas/Cliente/ruta-carrito/ruta-carrito.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../servicios/interfaces/app/base-control.interface";
import {TarjetaInterface} from "../../servicios/interfaces/modelo/tarjeta.interface";
import {TarjetaCreateInterface} from "../../servicios/interfaces/create/tarjetaCreate.interface";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss'],
  providers: [DatePipe]
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
              private readonly formBuilder: FormBuilder,
              private datePipe: DatePipe,) {
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
    const numero = this.formGroup.get('tarjeta')?.value
    const fecha = this.formGroup.get('fechaExpiracion')?.value
    const expiracion = this.datePipe.transform(fecha, 'yyyy/MM/dd');
    const cvv = this.formGroup.get('cvv')?.value
    const idUsuario = this.data.idUsuario



    const tarjeta = {
      numero: numero,
      entidadBancaria: expiracion + '-' + cvv,
      idUsuario: idUsuario
    } as TarjetaCreateInterface

    this.dialogRef.close({tarjeta: tarjeta})
  }

  cancelar() {
    this.dialogRef.close()
  }
}
