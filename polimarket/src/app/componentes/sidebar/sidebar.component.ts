import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categorias=[
    {
      categoria:"Lacteos",
      cantProductos:10
    },
    {
      categoria:"Cocina",
      cantProductos:15
    },
    {
      categoria:"Embutidos",
      cantProductos:20
    },
    {
      categoria:"Aseo Personal",
      cantProductos:29
    },
    {
      categoria:"Limpieza Hogar",
      cantProductos:40
    },
    {
      categoria:"Libros",
      cantProductos:59
    },
    {
      categoria:"Snacks",
      cantProductos:110
    },
    {
      categoria:"Licores",
      cantProductos:56
    },
    {
      categoria:"Utiles Escolares",
      cantProductos:8
    },
    {
      categoria:"Decoraciones",
      cantProductos:5
    },
    {
      categoria:"Revistas",
      cantProductos:65
    },
    {
      categoria:"Juguetes",
      cantProductos:15
    },
    {
      categoria:"Lacteos",
      cantProductos:9
    },
    {
      categoria:"Condimentos",
      cantProductos:9
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
