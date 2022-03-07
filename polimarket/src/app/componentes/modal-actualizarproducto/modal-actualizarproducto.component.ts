import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CategoriaInterface} from "../../servicios/interfaces/modelo/categoria.interface";
import {CategoriaService} from "../../servicios/http/categoria.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaProductosComponent} from "../../rutas/AdministradorGeneral/ruta-productos/ruta-productos.component";
import {ProductoService} from "../../servicios/http/producto.service";
import {ProductoCreateInterface} from "../../servicios/interfaces/create/productoCreate.interface";
import {ProductoInterface} from "../../servicios/interfaces/modelo/producto.interface";

@Component({
  selector: 'app-modal-actualizarproducto',
  templateUrl: './modal-actualizarproducto.component.html',
  styleUrls: ['./modal-actualizarproducto.component.scss']
})
export class ModalActualizarproductoComponent implements OnInit {
  formGroup!: FormGroup;
  arrayCategorias!:CategoriaInterface[];
  constructor(
    private  readonly formBuilder:FormBuilder,
    private readonly categoriaService:CategoriaService,
    private readonly router:Router,
    public dialogRef:MatDialogRef<RutaProductosComponent>,
    private readonly productoService:ProductoService,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
    this.arrayCategorias=this.data.arrayCategorias;
    this.prepararFormulario()
  }
  prepararFormulario(){
    this.formGroup=this.formBuilder.group(
      {
        nombre:new FormControl(
          {
            value:this.data.producto.nombre.trim(),
            disabled:false
          },
          []
        ),
        precio:new FormControl(
          {
            value:this.data.producto.precio,
            disabled:false
          },
          []
        ),
        categoria:new FormControl(
          {
            value:this.obtenerValorEnArregloDeCategoria(this.data.producto.idCategoria),
            disabled:false
          },
          []
        ),
        imagen:new FormControl(
          {
            value:"https://bit.ly/"+this.data.producto.codigo.trim(),
            disabled:false
          },
          []
        ),
      }
    )
  }
  prepararObjeto():ProductoInterface{
    if(this.formGroup){
      const idProducto=this.data.producto.idProducto;
      const nombre=this.formGroup.get("nombre")?.value;
      const precio=this.formGroup.get("precio")?.value;
      const categoria=this.formGroup.get("categoria")?.value;
      const imagen=this.formGroup.get("imagen")?.value;
      const categoriaObj=this.arrayCategorias[+categoria];
      const codigo = this.obtenerCodigoDeImagen(imagen);
      const productoObjeto={
        idProducto:idProducto,
        nombre:nombre,
        codigo:codigo,
        precio:precio,
        idCategoria:categoriaObj.idCategoria
      } as ProductoInterface;
      return productoObjeto;
    }
    return {
      idProducto:0,
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
  obtenerValorEnArregloDeCategoria(idCategoria:number):string{
    let valorEnArreglo=0;
    if(this.arrayCategorias){
      let contador=0;
      for(let categoria of this.arrayCategorias){
        if(categoria.idCategoria===idCategoria){
          valorEnArreglo=contador;
          break;
        }
        contador++;
      }
    }
    console.log("valor cat en arreglo", valorEnArreglo);
    return valorEnArreglo.toString();
  }
  actualizarProducto(){
    const objetoActualizar=this.prepararObjeto();
    this.productoService.actualizarPorId(objetoActualizar.idProducto,objetoActualizar)
      .subscribe(
        {
          next:(data)=>{
            console.log("data actualizar",data);
            this.dialogRef.close();
            this.router.navigate(["/admin-general",0,"cuentas"]);
          },
          error:(error)=>{
            console.log("error");
          },
          complete:()=>{

          }
        }
      );
  }
}
