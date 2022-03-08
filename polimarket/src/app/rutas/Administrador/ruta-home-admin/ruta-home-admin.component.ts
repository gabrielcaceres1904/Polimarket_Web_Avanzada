import { Component, OnInit } from '@angular/core';
import {AdminHomeBoxInterface} from "../../../servicios/interfaces/app/admin-home-box.interface";
import {SucursalService} from "../../../servicios/http/sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SucursalInterface} from "../../../servicios/interfaces/modelo/sucursal.interface";
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";

@Component({
  selector: 'app-ruta-home-admin',
  templateUrl: './ruta-home-admin.component.html',
  styleUrls: ['./ruta-home-admin.component.scss']
})
export class RutaHomeAdminComponent implements OnInit {
  tituloAdmin = '';
  nombreAdmin = ''
  categories = ['Home', 'Productos', "Pedidos"];
  idUsuario = -1

  constructor(private readonly sucursalService: SucursalService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly usuarioService: UsuarioService) {

  }
  ngOnInit() {
    const parametroRuta$ = this.activatedRoute.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdmin'];
          this.buscarAdminSucursal(this.idUsuario)
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }

  private buscarAdminSucursal(idUsuario: number) {
    // Buscar info de admin
    this.usuarioService.buscarUno(idUsuario)
      .subscribe(
        {
          next: (datos) => { // try then
            const admin = datos as UsuarioInterface
            this.nombreAdmin = admin.nombre + ' ' + admin.apellido
          },
          error: (error) => { // catch
            console.error({error});
          },
          complete: ()=> {
            // Buscar info de sucursal
            this.sucursalService.buscarTodos({})
              .subscribe(
                {
                  next: (datos) => { // try then
                    const sucursales = datos as SucursalInterface[]
                    for(let sucursal of sucursales){
                      if(sucursal.idUsuario == idUsuario){
                        this.tituloAdmin = sucursal.direccion
                      }
                    }
                  },
                  error: (error) => { // catch
                    console.error({error});
                  },
                  complete: () => {
                    //const ruta = ['/admin', this.idUsuario, 'home'];
                    //this.router.navigate(ruta);
                  }
                }
              )
          }
        }
      )
  }
}
