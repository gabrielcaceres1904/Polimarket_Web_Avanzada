import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";
import {RutaHomeclienteComponent} from "./rutas/Cliente/ruta-homecliente/ruta-homecliente.component";
import {RutaSignInComponent} from "./rutas/ruta-sign-in/ruta-sign-in.component";

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
    path: 'cliente',
    component: RutaHomeclienteComponent,
    children: []
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
