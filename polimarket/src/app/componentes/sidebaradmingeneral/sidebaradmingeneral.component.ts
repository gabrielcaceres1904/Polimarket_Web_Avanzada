import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalDataService} from "../../servicios/global/global-data.service";

@Component({
  selector: 'app-sidebaradmingeneral',
  templateUrl: './sidebaradmingeneral.component.html',
  styleUrls: ['./sidebaradmingeneral.component.scss']
})
export class SidebaradmingeneralComponent implements OnInit {
  @Input()
  tituloSideBar="Categorías"
  @Input()
  categories: {
    idCategoria: number,
    categoria: string,
    cantProductos: number
  }[] = []

  idUsuario = -1

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    // @ts-ignore
    const parametroRuta$ = this.activatedRoute.parent.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdminGeneral'];
          console.log("idusuario", this.idUsuario)
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }
  actualizarProductos(categoria: any) {
    console.log("categoria", typeof categoria)
    let idUsuario=0;
    if(GlobalDataService.administradorGeneral.idUsuario){
      idUsuario=GlobalDataService.administradorGeneral.idUsuario;
    }
    if(categoria===1){
      this.router.navigate(['/admin-general',idUsuario,"cuentas"]);
    }
    if(categoria===2){
      this.router.navigate(['/admin-general',idUsuario,"productos"]);
    }
  }
}
