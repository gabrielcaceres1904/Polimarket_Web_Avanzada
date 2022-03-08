import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {
  @Input()
  tituloSideBar = '';
  @Input()
  categories: string[] = [];

  idUsuario = -1

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {

    const parametroRuta$ = this.activatedRoute.params;
    parametroRuta$
      .subscribe({
        next:(parametrosRuta) => {
          //console.log(parametrosRuta)
          this.idUsuario = parametrosRuta['idAdmin'];
          //console.log('Usuario Sidebar: ', this.idUsuario)
        }
      })
  }

  cambiarSeccion(categoria: any) {
    const seccion = categoria as string
    if(seccion === this.categories[0]){
      this.router.navigate(['/admin', this.idUsuario, 'home']);
    }else if(seccion === this.categories[1]){
      this.router.navigate(['/admin', this.idUsuario, 'productos']);
    }else{
      this.router.navigate(['/admin', this.idUsuario, 'pedidos']);
    }
  }
}
