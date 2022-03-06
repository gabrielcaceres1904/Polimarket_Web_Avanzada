import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaCuentasComponent} from "../../rutas/AdministradorGeneral/ruta-cuentas/ruta-cuentas.component";
import {ProductoInterface} from "../../servicios/interfaces/modelo/producto.interface";
import {CategoriaService} from "../../servicios/http/categoria.service";
import {ProductoService} from "../../servicios/http/producto.service";
import {CategoriaInterface} from "../../servicios/interfaces/modelo/categoria.interface";
import {ProductoCreateInterface} from "../../servicios/interfaces/create/productoCreate.interface";
import {RutaProductosComponent} from "../../rutas/AdministradorGeneral/ruta-productos/ruta-productos.component";

@Component({
  selector: 'app-modal-registroproducto',
  templateUrl: './modal-registroproducto.component.html',
  styleUrls: ['./modal-registroproducto.component.scss']
})
export class ModalRegistroproductoComponent implements OnInit {
  formGroup!: FormGroup;
  arrayCategorias!:CategoriaInterface[];
  constructor(
    private  readonly formBuilder:FormBuilder,
    private readonly categoriaService:CategoriaService,
    private readonly router:Router,
    public dialogRef:MatDialogRef<RutaProductosComponent>,
    private readonly productoService:ProductoService,
    @Inject(MAT_DIALOG_DATA)
    public data:CategoriaInterface[]
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.arrayCategorias=this.data;
      this.prepararFormulario();
    }
  }
  prepararFormulario(){
    this.formGroup=this.formBuilder.group(
      {
        nombre:new FormControl(
          {
            value:'',
            disabled:false
          },
          []
        ),
        precio:new FormControl(
          {
            value:0.1,
            disabled:false
          },
          []
        ),
        categoria:new FormControl(
          {
            value:'0',
            disabled:false
          },
          []
        ),
        imagen:new FormControl(
          {
            value:'',
            disabled:false
          },
          []
        ),
      }
    )
  }
  prepararObjeto():ProductoCreateInterface{
    if(this.formGroup){
      const nombre=this.formGroup.get("nombre")?.value;
      const precio=this.formGroup.get("precio")?.value;
      const categoria=this.formGroup.get("categoria")?.value;
      const imagen=this.formGroup.get("imagen")?.value;
      const categoriaObj=this.arrayCategorias[+categoria];
      const codigo = this.obtenerCodigoDeImagen(imagen);
      const productoObjeto={
        nombre:nombre,
        codigo:codigo,
        precio:precio,
        idCategoria:categoriaObj.idCategoria
      } as ProductoCreateInterface;
      return productoObjeto;
    }
    return {
      nombre:"default",
      codigo:"default",
      precio:0,
      idCategoria:0
    }

  }
  obtenerCodigoDeImagen(urlBitly:string):string{
    //En base a una URL de bitly se obtiene el codigo de laimagen asociada
    let codigo="";
    if(urlBitly){
      let contador=0;
      let entroEnLaY=false
      for(let c of urlBitly){
        if(c==='y'){
          entroEnLaY=true
        }
        if(c==='/'&&entroEnLaY){
          codigo = urlBitly.substring(contador+1,urlBitly.length)
          console.log("codigo",codigo);
          break;
        }
        contador++;
      }
    }
    return codigo;
  }
  ingresarProducto(){
    const prodACrear = this.prepararObjeto();
    this.productoService.crear(prodACrear)
      .subscribe(
        {
          next:(data)=>{
            if(data){
              this.dialogRef.close();
              this.router.navigate(["/admin-general",0,'cuentas'])
            }
          },
          error:(error)=>{
            console.log("error", error);
          },
          complete:()=>{

          }
        }
      )
  }
}
