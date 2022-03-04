import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";
import {RutaHomeclienteComponent} from "./rutas/Cliente/ruta-homecliente/ruta-homecliente.component";
import {RutaSignInComponent} from "./rutas/ruta-sign-in/ruta-sign-in.component";
import {RutaHomeAdminComponent} from "./rutas/Administrador/ruta-home-admin/ruta-home-admin.component";
import {RutaHomeAdminGeneralComponent} from "./rutas/AdministradorGeneral/ruta-home-admin-general/ruta-home-admin-general.component";
import {RutaListaProductosComponent} from "./rutas/Cliente/ruta-lista-productos/ruta-lista-productos.component";
import {RutaCarritoComponent} from "./rutas/Cliente/ruta-carrito/ruta-carrito.component";
import {RutaPerfilComponent} from "./rutas/Cliente/ruta-perfil/ruta-perfil.component";
import {RutaResumenComponent} from "./rutas/Cliente/ruta-resumen/ruta-resumen.component";

const routes: Routes = [
  {
    path: 'login',
    component: RutaLoginComponent
  },
  {
    path: 'sign-in',
    component: RutaSignInComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // Cliente
  {
    path: 'cliente',
    component: RutaHomeclienteComponent,
    children: [
      {
        path: 'home',
        component: RutaListaProductosComponent
      },
      {
        path: 'carrito',
        component: RutaCarritoComponent
      },
      {
        path: 'perfil',
        component: RutaPerfilComponent
      },
      {
        path: 'resumen',
        component: RutaResumenComponent
      }
    ]
  },

  // Administrador
  {
    path: 'admin',
    component: RutaHomeAdminComponent,
    children: []
  },

  // Administrador General
  {
    path: 'admin-general',
    component: RutaHomeAdminGeneralComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
