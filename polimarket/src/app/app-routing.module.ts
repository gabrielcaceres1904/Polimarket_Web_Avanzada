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
import {RutaCuentasComponent} from "./rutas/AdministradorGeneral/ruta-cuentas/ruta-cuentas.component";
import {RutaProductosComponent} from "./rutas/AdministradorGeneral/ruta-productos/ruta-productos.component";
import {RutaAdmingeneralPerfilComponent} from "./rutas/AdministradorGeneral/ruta-admingeneral-perfil/ruta-admingeneral-perfil.component";

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
    path: 'cliente/:idCliente',
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
    path: 'admin-general/:idAdminGeneral',
    component: RutaHomeAdminGeneralComponent,
    children: [
      {
        path:'home',
        component: RutaProductosComponent
      },
      {
        path:'cuentas',
        component:RutaCuentasComponent
      },
      {
        path:'cuentas/:idAdminGeneral/:user',
        component:RutaCuentasComponent
      },
      {
        path:'productos',
        component:RutaProductosComponent
      },
      {
        path:'perfil',
        component:RutaAdmingeneralPerfilComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
