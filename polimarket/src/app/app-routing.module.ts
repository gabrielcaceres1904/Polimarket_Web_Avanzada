import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";
import {RutaHomeclienteComponent} from "./rutas/Cliente/ruta-homecliente/ruta-homecliente.component";
import {RutaSignInComponent} from "./rutas/ruta-sign-in/ruta-sign-in.component";
import {RutaHomeAdminComponent} from "./rutas/Administrador/ruta-home-admin/ruta-home-admin.component";
import {RutaHomeAdminGeneralComponent} from "./rutas/AdministradorGeneral/ruta-home-admin-general/ruta-home-admin-general.component";

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
    children: []
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
