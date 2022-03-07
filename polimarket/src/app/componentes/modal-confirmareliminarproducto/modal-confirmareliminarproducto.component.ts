import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ProductoService} from "../../servicios/http/producto.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaProductosComponent} from "../../rutas/AdministradorGeneral/ruta-productos/ruta-productos.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-confirmareliminarproducto',
  templateUrl: './modal-confirmareliminarproducto.component.html',
  styleUrls: ['./modal-confirmareliminarproducto.component.scss']
})
export class ModalConfirmareliminarproductoComponent implements OnInit {

  constructor(
   private readonly productoService:ProductoService,
    public dialogRef:MatDialogRef<RutaProductosComponent>,
    private readonly router:Router,
    @Inject(MAT_DIALOG_DATA)
    private readonly data:number
  ) { }

  ngOnInit(): void {
  }
  confirmar(){
    this.productoService.eliminarPorId(this.data)
      .subscribe(
        {
          next:(data)=>{
            if(data){
              console.log("Eliminando a ", data);
              this.dialogRef.close();
              this.router.navigate(["/admin-general",0,"cuentas"]);
            }
          },
          error:()=>{

          },
          complete:()=>{

          }
        }
      )
  }
  cancelar(){
    this.dialogRef.close();
  }
}
