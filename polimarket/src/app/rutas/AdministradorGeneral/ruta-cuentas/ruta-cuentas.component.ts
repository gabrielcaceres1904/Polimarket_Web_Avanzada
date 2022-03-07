import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../servicios/http/usuario.service";
import {UsuarioInterface} from "../../../servicios/interfaces/modelo/usuario.interface";
import {MatDialog} from "@angular/material/dialog";
// import {ModalRegistrocuentaComponent} from "../../../componentes/modal-registrocuenta/modal-registrocuenta.component";
import {UsuarioRolService} from "../../../servicios/http/usuario-rol.service";
import {UsuarioRolInterface} from "../../../servicios/interfaces/modelo/usuario-rol.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalDataService} from "../../../servicios/global/global-data.service";
import {ModalEliminarcuentaComponent} from "../../../componentes/modal-eliminarcuenta/modal-eliminarcuenta.component";
// import {ModalEliminarcuentaComponent} from "../../../componentes/modal-eliminarcuenta/modal-eliminarcuenta.component";

@Component({
  selector: 'app-ruta-cuentas',
  templateUrl: './ruta-cuentas.component.html',
  styleUrls: ['./ruta-cuentas.component.scss']
})
export class RutaCuentasComponent implements OnInit {
  busqueda="";
  //recueprar datos de tablas
  listaUsuarios:UsuarioInterface[]=[]
  constructor(
    private readonly usersService:UsuarioService,
    private readonly usuarioRolService:UsuarioRolService,
    public dialog:MatDialog,
    private readonly router:Router,
    private readonly activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    // let param = ""
    // let idUsuario = ""
    const parametros$ = this.activatedRoute.queryParams.subscribe(
      params=>{
        const param =this.activatedRoute.snapshot.paramMap.get("user");
        const idUsuario=this.activatedRoute.snapshot.paramMap.get("idAdminGeneral");
        console.log("entrando a params")
        console.log("param",param);
        console.log("user aqui", idUsuario);
        if(param){
          this.busqueda=param;
          this.buscarPorNombre(this.busqueda)
        }else{
          this.llenarUsuarios("")
        }
      }
      // {
      //   next:(data)=>{
      //
      //   },
      //   error:(error)=>{
      //     console.log(error);
      //   },
      //   complete:()=>{
      //
      //   }
      // }
    )


  }
  llenarUsuarios(param:string){
    this.usersService.buscarTodos(param).subscribe(
      {
        next:(data)=>{
          if(data){
            this.listaUsuarios=data;
          }
        }
      }
    );
  }
  buscarPorNombre(nombre:string){
    //llenando lista con todos los usuarios
    this.llenarUsuarios("")
    this.usersService.buscarTodos("").subscribe(
      {
        next:(data)=>{
          if(data){
            for(let usuario of data){
              if(usuario.nombre.trim()===nombre.trim()){
                let usersFind:UsuarioInterface[]=[];
                usersFind.push(usuario);
                this.listaUsuarios=usersFind;
                break;
              }
            }
          }
        },
        error:(error)=>{

        },
        complete:()=>{

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
