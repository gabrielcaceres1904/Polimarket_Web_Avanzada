import {Component, OnInit} from '@angular/core';
import {OfertaBoxInterface} from "../../../servicios/interfaces/app/oferta-box.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductoService} from "../../../servicios/http/producto.service";
import {CategoriaService} from "../../../servicios/http/categoria.service";
import {CategoriaInterface} from "../../../servicios/interfaces/modelo/categoria.interface";
import {ProductoInterface} from "../../../servicios/interfaces/modelo/producto.interface";
import {MatDialog} from "@angular/material/dialog";
import {CompraCarritoInterface} from "../../../servicios/interfaces/app/compra-carrito.interface";
import {GlobalDataService} from "../../../servicios/global/global-data.service";
import {ModalComponent} from "../../../componentes/modal/modal.component";
import {SucursalInterface} from "../../../servicios/interfaces/modelo/sucursal.interface";
import {DetalleCategoriaInterface} from "../../../servicios/interfaces/app/detalleCategoria.interface";
import {SucursalProductoService} from "../../../servicios/http/sucursal-producto.service";
import {SucursalProductoInterface} from "../../../servicios/interfaces/modelo/sucursal-producto.interface";


@Component({
  selector: 'app-ruta-lista-productos',
  templateUrl: './ruta-lista-productos.component.html',
  styleUrls: ['./ruta-lista-productos.component.scss']
})
export class RutaListaProductosComponent implements OnInit {

  // Lista de ofertas
  prefix = 'https://bit.ly/'

  detalleCategorias: DetalleCategoriaInterface[] = []
  sucursales: SucursalInterface[] = [];

  ofertas:OfertaBoxInterface[] = []
  categoriaSeleccionada = -1
  sucursalSeleccionada = -1

  idUsuario: number = 0

  // Compras del carrito
  productoSeleccionado: ProductoInterface = {} as ProductoInterface
  carrito: CompraCarritoInterface[] = []

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly productoService: ProductoService,
              private readonly categoriaService: CategoriaService,
              private readonly sucursalProductoService: SucursalProductoService,
              public dialog: MatDialog) {
    this.buscarCategorias()
  }

  ngOnInit(): void {
    const parametrosConsulta$ = this.activatedRoute.queryParams;

    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          //console.log(queryParams);
          this.categoriaSeleccionada = Number.parseInt(queryParams['categoria'])
          this.sucursalSeleccionada = Number.parseInt(queryParams['sucursal'])
          if(this.categoriaSeleccionada != undefined){
            this.buscarProductos(this.categoriaSeleccionada, this.sucursalSeleccionada)
          }
        },
        error: (error)=>{
          console.error(error)
        },
      }
    )

    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idCliente'];
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })

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
                  producto: this.productoSeleccionado,
                  stock: ofertaInterface.stock
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
                        cantidad: Number.parseInt(datos['cantidad']),
                        stock: Number.parseInt(datos['stock'])
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

  private buscarProductos(categoria: number, sucursalSeleccionada: number) {
    //sucursalSeleccionada = 0
    if(sucursalSeleccionada === 0){
      this.buscarTodosProductos(categoria)
    }else{
      this.buscarProductosPorSucursal(categoria, sucursalSeleccionada)
    }
  }

  private buscarTodosProductos(categoria: number){
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
                    precio: producto.precio,
                    soldOut: false, // TODO
                    stock: 0
                  }
                )
              }
            }
            this.ofertas = ofertasCategoria
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            this.buscarCategorias()
          }
        }
      )
  }

  private buscarProductosPorSucursal(categoria: number, sucursal: number){
    let productosID: {
      idProducto: number
      stock: number
    }[] = []
    this.sucursalProductoService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursalProductos = datos as SucursalProductoInterface[]
            for(let sucursalProducto of sucursalProductos){
              if(sucursalProducto.idSucursal === sucursal){
                productosID.push(
                  {
                    idProducto: sucursalProducto.idProducto,
                    stock: sucursalProducto.stock
                  }
                )
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            let ofertasCategoria: OfertaBoxInterface[] = []
            let cont = 0
            for(let productoSucursal of productosID){
              this.productoService.buscarUno(productoSucursal.idProducto)
                .subscribe(
                  {
                    next: (datos) => { // try then
                      const producto = datos as ProductoInterface
                      if(producto.idCategoria === categoria){
                        let valorSoldOut = true
                        if(productoSucursal.stock != 0){
                          valorSoldOut = false
                        }
                        ofertasCategoria.push(
                          {
                            nombre: producto.nombre,
                            idProducto: producto.idProducto,
                            url: this.prefix + producto.codigo,
                            precio: producto.precio,
                            soldOut: valorSoldOut,
                            stock: productoSucursal.stock
                          }
                        )
                      }
                    },
                    error: (error) => { // catch
                      console.error({error});
                    },
                    complete: () => {
                      cont++
                      if(cont === productosID.length){
                        //console.log('Total: ', productosID.length)
                        //console.log(ofertasCategoria)
                        this.ofertas = ofertasCategoria
                        this.buscarCategoriasSucursal(sucursal, productosID)
                      }
                    }
                  }
                )
            }
          }
        }
      )
  }

  private buscarCategorias() {
    let categorias: CategoriaInterface[] = []
    let detalles: DetalleCategoriaInterface[] = []

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

                      detalles.push(
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
                  complete: () => {
                    this.detalleCategorias = detalles
                  }
                }
              )
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }

  private buscarCategoriasSucursal(sucursal: number, productosID: { idProducto: number; stock: number }[]){
    let detalles: DetalleCategoriaInterface[] = []
    let categorias: CategoriaInterface[] = []

    // Buscar Categorias
    this.categoriaService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            categorias = datos as CategoriaInterface[]
            for(let i=0; i<categorias.length; i++){
              let cont = 0
              let contCategoria = 0
              for(let productoSucursal of productosID){
                // Buscar cada producto de la sucursal
                this.productoService.buscarUno(productoSucursal.idProducto)
                  .subscribe(
                    {
                      next: (datos) => { // try then
                        const producto = datos as ProductoInterface
                        if(producto.idCategoria === categorias[i].idCategoria){
                          cont++
                        }
                      },
                      error: (error) => { // catch
                        console.error({error});
                      },
                      complete: () => {
                        contCategoria++
                        if(contCategoria === productosID.length){
                          detalles.push(
                            {
                              idCategoria: categorias[i].idCategoria,
                              categoria: categorias[i].nombre,
                              cantProductos: cont
                            }
                          )
                        }
                      }
                    }
                  )
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            this.detalleCategorias = detalles
          }
        }
      )
  }
}
