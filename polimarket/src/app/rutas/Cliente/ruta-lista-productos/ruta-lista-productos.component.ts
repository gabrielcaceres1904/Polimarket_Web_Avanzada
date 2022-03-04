import {Component, OnInit} from '@angular/core';
import {OfertaBoxInterface} from "../../../servicios/interfaces/app/oferta-box.interface";
import {ActivatedRoute} from "@angular/router";
import {ProductoService} from "../../../servicios/http/producto.service";
import {CategoriaService} from "../../../servicios/http/categoria.service";
import {CategoriaInterface} from "../../../servicios/interfaces/modelo/categoria.interface";
import {ProductoInterface} from "../../../servicios/interfaces/modelo/producto.interface";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../componentes/modal/modal.component";
import {CompraCarritoInterface} from "../../../servicios/interfaces/app/compra-carrito.interface";
import {GlobalDataService} from "../../../servicios/global/global-data.service";


@Component({
  selector: 'app-ruta-lista-productos',
  templateUrl: './ruta-lista-productos.component.html',
  styleUrls: ['./ruta-lista-productos.component.scss']
})
export class RutaListaProductosComponent implements OnInit {

  // Lista de ofertas
  prefix = 'https://bit.ly/'

  detalleCategorias: {
    idCategoria: number,
    categoria: string,
    cantProductos: number
  }[] = []

  ofertas:OfertaBoxInterface[] = []
  categoriaSeleccionada = ''

  // Compras del carrito
  productoSeleccionado: ProductoInterface = {} as ProductoInterface
  carrito: CompraCarritoInterface[] = []

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly productoService: ProductoService,
              private readonly categoriaService: CategoriaService,
              public dialog: MatDialog) {
    this.buscarCategorias()
  }

  ngOnInit(): void {
    const parametrosConsulta$ = this.activatedRoute.queryParams;

    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          //console.log(queryParams);
          this.categoriaSeleccionada = queryParams['categoria']
          if(this.categoriaSeleccionada != undefined){
            this.buscarProductos(Number.parseInt(this.categoriaSeleccionada))
          }
        },
        error: (error)=>{
          console.error(error)
        },
      }
    )
  }

  verOferta(oferta: any) {
    const ofertaInterface = oferta as OfertaBoxInterface

    this.productoService.buscarUno(ofertaInterface.idProducto)
      .subscribe(
        {
          next: (datos) => { // try then
            this.productoSeleccionado = datos as ProductoInterface
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            const referenciaDialogo = this.dialog.open(
              ModalComponent,
              {
                disableClose: false,
                data: {
                  producto: this.productoSeleccionado
                }
              }
            )
            const despuesCerrado$ = referenciaDialogo.afterClosed()
            despuesCerrado$
              .subscribe(
                (datos) => {
                  if(datos!=undefined){
                    this.carrito.push(
                      {
                        producto: this.productoSeleccionado,
                        cantidad: Number.parseInt(datos['cantidad'])
                      }
                    )
                    console.log(this.carrito)
                    GlobalDataService.comprasCarrito = this.carrito
                  }
                }
              )
          }
        }
      )
  }

  private buscarProductos(categoria: number) {
    this.productoService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const productos = datos as ProductoInterface[]
            let ofertasCategoria: OfertaBoxInterface[] = []
            for(let producto of productos){
              if(producto.idCategoria === categoria){
                ofertasCategoria.push(
                  {
                    nombre: producto.nombre,
                    idProducto: producto.idProducto,
                    url: this.prefix + producto.codigo,
                    precio: producto.precio
                  }
                )
              }
            }
            this.ofertas = ofertasCategoria
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }

  private buscarCategorias() {
    let categorias: CategoriaInterface[] = []

    // Buscar Categorias
    this.categoriaService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            categorias = datos as CategoriaInterface[]

            // Buscar productos por categoria
            this.productoService.buscarTodos({})
              .subscribe(
                {
                  next: (datos) => { // try then
                    const productos = datos as ProductoInterface[]
                    for(let i=0; i<categorias.length; i++){
                      let cont = 0
                      for(let producto of productos){
                        if(producto.idCategoria === categorias[i].idCategoria){
                          cont++
                        }
                      }

                      this.detalleCategorias.push(
                        {
                          idCategoria: categorias[i].idCategoria,
                          categoria: categorias[i].nombre,
                          cantProductos: cont
                        }
                      )
                    }
                    //console.log(cantidadProductos)
                  },
                  error: (error) => { // catch
                    console.error({error});
                  },
                }
              )
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }
}
