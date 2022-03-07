import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaListaProductosComponent} from "../../rutas/Cliente/ruta-lista-productos/ruta-lista-productos.component";
import {RutaCarritoComponent} from "../../rutas/Cliente/ruta-carrito/ruta-carrito.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {baseControlInterface} from "../../servicios/interfaces/app/base-control.interface";
import {TarjetaInterface} from "../../servicios/interfaces/modelo/tarjeta.interface";
import {TarjetaCreateInterface} from "../../servicios/interfaces/create/tarjetaCreate.interface";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {TarjetaService} from "../../servicios/http/tarjeta.service";

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

  bancos = [
    "Banco del Pichincha",
    "Banco de Guayaquil",
    "Banco del Pacífico",
    "Banco del Austro"
  ]

  tarjetaSeleccionada: TarjetaInterface = {} as TarjetaInterface
  tarjetas: {
    tarjeta: TarjetaInterface,
    banco: string
  }[] = []
  bancoSeleccionado = ''
  tieneTarjetas = false;
  secciones = [true, false, false]

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              public dialogRef: MatDialogRef<RutaCarritoComponent>,
              private readonly formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private readonly activatedRoute: ActivatedRoute,
              private readonly tarjetasService: TarjetaService) {
    this.formGroup =this.formBuilder.group(
      {
        tarjeta: ['', Validators.required],
        fechaExpiracion: ['', Validators.required],
        cvv: ['', Validators.required],
        banco: [Validators.required]
      }
    )
    this.tieneTarjetas = data.tieneTarjetas
    this.buscarTarjetas()
  }

  ngOnInit(): void {

  }

  ingresarTarjeta() {
    const numero = this.formGroup.get('tarjeta')?.value
    const fecha = this.formGroup.get('fechaExpiracion')?.value
    const expiracion = this.datePipe.transform(fecha, 'yyyy/MM/dd');
    const cvv = this.formGroup.get('cvv')?.value
    const idUsuario = this.data.idUsuario
    const banco = this.formGroup.get('banco')?.value

    const tarjeta = {
      numero: numero,
      entidadBancaria: banco + '-' + expiracion + '-' + cvv,
      idUsuario: idUsuario
    } as TarjetaCreateInterface

    this.dialogRef.close({tarjeta: tarjeta, create: true})
  }

  cancelar() {
    this.dialogRef.close()
  }

  selectChangeHandlerBanco(event: any) {
    this.bancoSeleccionado = event.target.value
  }

  selectChangeHandlerTarjeta(event: any) {
    const idTarjeta = Number.parseInt(event.target.value)
    this.tarjetasService.buscarUno(idTarjeta)
      .subscribe(
        {
          next: (datos) => { // try then
            this.tarjetaSeleccionada = datos as TarjetaInterface
          },
          error: (error) => { // catch
            console.error({error});
          }
        }
      )
  }

  private buscarTarjetas() {
    let tarjetasUsuario: {
      tarjeta: TarjetaInterface,
      banco: string
    }[] = []
    this.tarjetasService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            //console.log(datos)
            const tarjetas = datos as TarjetaInterface[]
            for(let tarjeta of tarjetas){
              if(tarjeta.idUsuario === Number.parseInt(this.data.idUsuario)){
                const parts = tarjeta.entidadBancaria.split('-', 3)
                tarjetasUsuario.push({
                  tarjeta: tarjeta,
                  banco: parts[0]
                })
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: ()=> {
            this.tarjetas = tarjetasUsuario
          }
        }
      )
  }

  cambiarSecciones(seccion: number){
    for(let i=0; i<this.secciones.length; i++){
      this.secciones[i] = i === seccion;
    }
  }

  realizarCompra() {
    this.dialogRef.close({tarjeta: this.tarjetaSeleccionada, create: false})
  }
}
