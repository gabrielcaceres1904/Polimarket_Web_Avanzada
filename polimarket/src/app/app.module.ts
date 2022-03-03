import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaHomeclienteComponent } from './rutas/Cliente/ruta-homecliente/ruta-homecliente.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { RutaNotFoundComponent } from './rutas/ruta-not-found/ruta-not-found.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RutaSignInComponent } from './rutas/ruta-sign-in/ruta-sign-in.component';
import { BaseControlComponent } from './componentes/base-control/base-control.component';
import { RutaHomeAdminComponent } from './rutas/Administrador/ruta-home-admin/ruta-home-admin.component';
import { RutaHomeAdminGeneralComponent } from './rutas/AdministradorGeneral/ruta-home-admin-general/ruta-home-admin-general.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaHomeclienteComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    RutaNotFoundComponent,
    RutaLoginComponent,
    RutaSignInComponent,
    BaseControlComponent,
    RutaHomeAdminComponent,
    RutaHomeAdminGeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
