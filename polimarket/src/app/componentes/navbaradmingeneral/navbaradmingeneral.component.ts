import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../servicios/http/usuario.service";
import {GlobalDataService} from "../../servicios/global/global-data.service";

@Component({
  selector: 'app-navbaradmingeneral',
  templateUrl: './navbaradmingeneral.component.html',
  styleUrls: ['./navbaradmingeneral.component.scss']
})
export class NavbaradmingeneralComponent implements OnInit {
  idUsuario = -1
  nombreAdminGeneral='Perfil';
  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly userService:UsuarioService) { }

  ngOnInit(): void {
    const parametroRuta$ = this.activatedRoute.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          console.log("NAVBAR ADMIN GENERAL",parametrosRuta);
          this.idUsuario = parametrosRuta['idAdminGeneral'];
          this.actualizarUsuarioGlobal(+parametrosRuta['idAdminGeneral']);
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }
  actualizarUsuarioGlobal(id:number){
    this.userService.buscarUno(id)
      .subscribe(
        {
          next:(data)=>{
            if(data){
              console.log("nav bar admin general",data);
              GlobalDataService.administradorGeneral.idUsuario=data.idUsuario;
              GlobalDataService.administradorGeneral.nombre=data.nombre.trim();
              GlobalDataService.administradorGeneral.apellido=data.apellido.trim();
              GlobalDataService.administradorGeneral.email=data.email.trim();
              GlobalDataService.administradorGeneral.direccion=data.direccion.trim();
              GlobalDataService.administradorGeneral.password=data.password.trim();
              this.nombreAdminGeneral=GlobalDataService.administradorGeneral.nombre;

            }
          },
          error:(error)=>{

          },
          complete:()=>{

          }
        }
      )
  }
  verPerfil() {
    console.log("global data service admin general:",GlobalDataService.administradorGeneral.idUsuario);
    const ruta = ['/admin-general', GlobalDataService.administradorGeneral.idUsuario, 'perfil'];
    this.router.navigate(ruta);
  }
  cerrarSesion() {
    const ruta = ['/login'];
    this.router.navigate(ruta);
  }
}
