import { Component, OnInit } from '@angular/core';
import {ProductoAdminInterface} from "../../../servicios/interfaces/app/productoAdmin.interface";
import {SucursalProductoService} from "../../../servicios/http/sucursal-producto.service";
import {ActivatedRoute} from "@angular/router";
import {SucursalInterface} from "../../../servicios/interfaces/modelo/sucursal.interface";
import {SucursalService} from "../../../servicios/http/sucursal.service";
import {SucursalProductoInterface} from "../../../servicios/interfaces/modelo/sucursal-producto.interface";
import {ProductoService} from "../../../servicios/http/producto.service";
import {ProductoInterface} from "../../../servicios/interfaces/modelo/producto.interface";

@Component({
  selector: 'app-ruta-admin-productos',
  templateUrl: './ruta-admin-productos.component.html',
  styleUrls: ['./ruta-admin-productos.component.scss']
})
export class RutaAdminProductosComponent implements OnInit {
  prefix = 'https://bit.ly/'

  idUsuario = -1
  sucursalAdmin: SucursalInterface = {} as SucursalInterface

  // Lista de Productos
  sucursalProductosAdmin: SucursalProductoInterface[] = []
  productosSucursal: ProductoAdminInterface[] = [];

  //Busqueda
  busqueda = ''
  sinFiltro = true
  categoriaSeleccionada = -1
  productosBusqueda: ProductoAdminInterface[] = [];


  constructor(private readonly sucursalProductosService: SucursalProductoService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly sucursalService: SucursalService,
              private readonly productosService: ProductoService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdmin'];
          this.buscarSucursal(this.idUsuario)
          //console.log('Usuario Sidebar: ', this.idUsuario)
        },
        complete: ()=> {

        }
      })

  }

  private buscarSucursal(idUsuario: number) {
    // Buscar info de sucursal
    this.sucursalService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursales = datos as SucursalInterface[]
            for(let sucursal of sucursales){
              if(sucursal.idUsuario == idUsuario){
                this.sucursalAdmin = sucursal
              }
            }
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            this.buscarProductos()
          }
        }
      )
  }

  actualizarStock(producto: any, adicional: any) {
    const productoSeleccionado = producto as ProductoAdminInterface
    const index = this.productosSucursal.indexOf(producto as ProductoAdminInterface)
    const idProd = productoSeleccionado.producto.idProducto
    const add = Number.parseInt(adicional)
    this.productosSucursal[index].stock += add
    //console.log('Adicional: ', add)

    this.sucursalProductosService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursalProductos = datos as SucursalProductoInterface[]
            for(let sucursalProducto of sucursalProductos){
              if(sucursalProducto.idProducto === idProd && sucursalProducto.idSucursal === this.sucursalAdmin.idSucursal){
                const valoresAActualizar = {
                  idSucursalProducto: sucursalProducto.idSucursalProducto,
                  stock: sucursalProducto.stock + add,
                  idSucursal: sucursalProducto.idSucursal,
                  idProducto: sucursalProducto.idProducto
                }
                const actualizar$ = this.sucursalProductosService
                  .actualizarPorId(
                    sucursalProducto.idSucursalProducto,
                    valoresAActualizar
                  );
                actualizar$
                  .subscribe(
                    {
                      next: (datos) => {
                        //console.log({datos})
                      },
                      error: (error) => {
                        console.error({error})
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
            //this.buscarProductos()
          }
        }
      )
  }

  private buscarProductos() {
    this.sucursalProductosService.buscarTodos({})
      .subscribe(
        {
          next: (datos) => { // try then
            const sucursalProductos = datos as SucursalProductoInterface[]
            let auxSucursalProductos: SucursalProductoInterface[] = []
            for(let sucursalProducto of sucursalProductos){
              if(sucursalProducto.idSucursal === this.sucursalAdmin.idSucursal){
                auxSucursalProductos.push(sucursalProducto)
              }
            }
            this.sucursalProductosAdmin = auxSucursalProductos
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: () => {
            let productos: ProductoAdminInterface[] = []
            let cont  = 0
            for(let sucursalProducto of this.sucursalProductosAdmin){
              this.productosService.buscarUno(sucursalProducto.idProducto)
                .subscribe(
                  {
                    next: (datos) => { // try then
                      const producto = datos as ProductoInterface
                      productos.push(
                        {
                          producto: producto,
                          stock: sucursalProducto.stock,
                          adicional: 0
                        }
                      )
                    },
                    error: (error) => { // catch
                      console.error({error});
                    },
                    complete: () => {
                      cont++
                      if(cont === this.sucursalProductosAdmin.length){
                        this.productosSucursal = productos
                        this.observersBusqueda()
                      }
                    }
                  }
                )
            }
          }
        }
      )
  }

  private buscarProductosCategoria(categoriaSeleccionada: number) {
    let productosSeleccionados: ProductoAdminInterface[] = []
    for(let producto of this.productosSucursal){
      if(producto.producto.idCategoria === categoriaSeleccionada){
        productosSeleccionados.push(producto)
      }
    }
    this.productosBusqueda = productosSeleccionados
  }

  private buscarProductosParametro(categoriaSeleccionada: number) {
    let productosSeleccionados: ProductoAdminInterface[] = []
    for(let producto of this.productosSucursal){
      if(producto.producto.idCategoria === categoriaSeleccionada && producto.producto.nombre.includes(this.busqueda)){
        productosSeleccionados.push(producto)
      }
    }
    this.productosBusqueda = productosSeleccionados
  }

  private buscarProductosNombre(categoriaSeleccionada: number) {
    let productosSeleccionados: ProductoAdminInterface[] = []
    for(let producto of this.productosSucursal){
      if(producto.producto.nombre.includes(this.busqueda)){
        productosSeleccionados.push(producto)
      }
    }
    this.productosBusqueda = productosSeleccionados
  }

  private observersBusqueda() {
    const parametrosConsulta$ = this.activatedRoute.queryParams;

    parametrosConsulta$.subscribe(
      {
        next:(queryParams)=>{
          //console.log(queryParams);
          this.categoriaSeleccionada = Number.parseInt(queryParams['categoria'])
          this.busqueda = queryParams['nombre']
          console.log('Ruta-Admin Busqueda: ', this.busqueda)
          console.log('Ruta-Admin Categoria: ', this.categoriaSeleccionada)

          if(!isNaN(this.categoriaSeleccionada)){
            if(this.busqueda != undefined){
              //console.log('Caso 1')
              this.buscarProductosParametro(this.categoriaSeleccionada)
              this.sinFiltro = false
            }else{
              //console.log('Caso 2')
              this.buscarProductosCategoria(this.categoriaSeleccionada)
              this.sinFiltro = false
            }
          }else{
            if(this.busqueda != undefined){
              //console.log('Caso 3')
              this.buscarProductosNombre(this.categoriaSeleccionada)
              this.sinFiltro = false
            }else{
              //console.log('Caso 4')
              this.sinFiltro = true
            }
          }
        },
        error: (error)=>{
          console.error(error)
        },
        complete: ()=> {

        }
      }
    )
  }
}
