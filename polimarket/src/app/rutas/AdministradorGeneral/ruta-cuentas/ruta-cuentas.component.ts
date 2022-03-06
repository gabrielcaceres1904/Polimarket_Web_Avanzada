import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";
import {MatDialog} from "@angular/material/dialog";
import {ModalRegistrocuentaComponent} from "../../../componentes/modal-registrocuenta/modal-registrocuenta.component";
import {UsuarioRolService} from "../../../servicios/http/usuario-rol.service";
import {UsuarioRolInterface} from "../../../servicios/interfaces/modelo/usuario-rol.interface";
import {Router} from "@angular/router";
import {GlobalDataService} from "../../../servicios/global/global-data.service";
import {ModalEliminarcuentaComponent} from "../../../componentes/modal-eliminarcuenta/modal-eliminarcuenta.component";

@Component({
  selector: 'app-ruta-cuentas',
  templateUrl: './ruta-cuentas.component.html',
  styleUrls: ['./ruta-cuentas.component.scss']
})
export class RutaCuentasComponent implements OnInit {

  //recueprar datos de tablas
  listaUsuarios:UsuarioInterface[]=[]
  constructor(
    private readonly usersService:UsuarioService,
    private readonly usuarioRolService:UsuarioRolService,
    public dialog:MatDialog,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.usersService.buscarTodos("").subscribe(
      {
        next:(data)=>{
          if(data){
            this.listaUsuarios=data;
          }
        }
     }
    )
  }
  eliminarCuenta(id:number){
    console.log("eliminando a",id);
    let usuarioRolInterface:UsuarioRolInterface={
      idUsuarioRol:0,
      idUsuario:0,
      idRol:0
    } ;
    //eliminando a usuario
    this.usersService.eliminarPorId(id).subscribe(
      {
        next:(data)=>{
          console.log("usuario rol interface eliminar",data);

        },
        error:(error)=>{
          console.log(error);
        },
        complete:()=>{

          this.usuarioRolService.buscarTodos("").subscribe(
            {
              next:(data)=>{
                //recuperando rol relacionado a usuario
                for(let roluser of data){
                  if(roluser.idUsuario===id){
                    usuarioRolInterface=roluser;
                    break;
                  }
                }
              },
              error:(error)=>{
                console.log(error);
              },
              complete:()=>{
                //eliminar rol usuario
                if(usuarioRolInterface.idUsuarioRol!=0){
                  this.usuarioRolService.eliminarPorId(usuarioRolInterface.idUsuarioRol)
                    .subscribe(
                      {
                        next:(data)=>{
                          console.log("eliminando a",data);
                          this.router.navigate(
                            ['/admin-general',GlobalDataService.administradorGeneral.idUsuario,'home']
                          )
                        },
                        error:()=>{

                        },
                        complete:()=>{

                        }
                      }
                    )
                }

              }
            }
          )
        }
      }
    )
  }
  actualizarUsuario(usuario:UsuarioInterface){
    //Dice eliminar pero es actualizar :p **************
    this.dialog.open(ModalEliminarcuentaComponent,
      {
        data:usuario,
        height:"85%",
        width:"60%"
      })
  }
}
