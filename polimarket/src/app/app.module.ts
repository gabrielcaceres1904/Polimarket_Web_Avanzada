import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaHomeclienteComponent } from './rutas/Cliente/ruta-homecliente/ruta-homecliente.component';
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
import { RutaListaProductosComponent } from './rutas/Cliente/ruta-lista-productos/ruta-lista-productos.component';
import { RutaCarritoComponent } from './rutas/Cliente/ruta-carrito/ruta-carrito.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { RutaPerfilComponent } from './rutas/Cliente/ruta-perfil/ruta-perfil.component';
import { RutaResumenComponent } from './rutas/Cliente/ruta-resumen/ruta-resumen.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { RutaCuentasComponent } from './rutas/AdministradorGeneral/ruta-cuentas/ruta-cuentas.component';
import { RutaProductosComponent } from './rutas/AdministradorGeneral/ruta-productos/ruta-productos.component';
import { RutaAdmingeneralPerfilComponent } from './rutas/AdministradorGeneral/ruta-admingeneral-perfil/ruta-admingeneral-perfil.component';
import { AdmingeneralbusquedacomponentComponent } from './componentes/admingeneralbusquedacomponent/admingeneralbusquedacomponent.component';
import { DoughnutChartComponent } from './componentes/doughnut-chart/doughnut-chart.component';
import {NgChartsModule} from "ng2-charts";
import { AdmingeneralbusqproductosComponent } from './componentes/admingeneralbusqproductos/admingeneralbusqproductos.component';
import { ModalRegistroproductoComponent } from './componentes/modal-registroproducto/modal-registroproducto.component';
import { ModalConfirmareliminarproductoComponent } from './componentes/modal-confirmareliminarproducto/modal-confirmareliminarproducto.component';
import {OfertaBoxComponent} from "./componentes/oferta-box/oferta-box.component";
import {ModalComponent} from "./componentes/modal/modal.component";
import {ModalPagoComponent} from "./componentes/modal-pago/modal-pago.component";
import {SidebaradmingeneralComponent} from "./componentes/sidebaradmingeneral/sidebaradmingeneral.component";
import {NavbaradmingeneralComponent} from "./componentes/navbaradmingeneral/navbaradmingeneral.component";
import {ModalRegistrocuentaComponent} from "./componentes/modal-registrocuenta/modal-registrocuenta.component";
import {ModalEliminarcuentaComponent} from "./componentes/modal-eliminarcuenta/modal-eliminarcuenta.component";
import {LineChartComponent} from "./componentes/line-chart/line-chart.component";
import {SidebarComponent} from "./componentes/sidebar/sidebar.component";
import { BusquedaOfertasComponent } from './componentes/busqueda-ofertas/busqueda-ofertas.component';
import { ModalActualizarproductoComponent } from './componentes/modal-actualizarproducto/modal-actualizarproducto.component';
import {MatIconModule} from "@angular/material/icon";
import { AdminHomeBoxComponent } from './componentes/admin-home-box/admin-home-box.component';
import { SidebarAdminComponent } from './componentes/sidebar-admin/sidebar-admin.component';
import { NavbarAdminComponent } from './componentes/navbar-admin/navbar-admin.component';
import { RutaDashboardComponent } from './rutas/Administrador/ruta-dashboard/ruta-dashboard.component';
import { RutaAdminPedidosComponent } from './rutas/Administrador/ruta-admin-pedidos/ruta-admin-pedidos.component';
import { RutaAdminProductosComponent } from './rutas/Administrador/ruta-admin-productos/ruta-admin-productos.component';
import { RutaAdminPerfilComponent } from './rutas/Administrador/ruta-admin-perfil/ruta-admin-perfil.component';
import { ModalDetallePedidoComponent } from './componentes/modal-detalle-pedido/modal-detalle-pedido.component';
import { RutaPerfiladmingeneralComponent } from './rutas/AdministradorGeneral/ruta-perfiladmingeneral/ruta-perfiladmingeneral.component';
import { ModalCambiarPasswordComponent } from './componentes/modal-cambiar-password/modal-cambiar-password.component';

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
    RutaHomeAdminGeneralComponent,
    RutaListaProductosComponent,
    OfertaBoxComponent,
    RutaCarritoComponent,
    ModalComponent,
    RutaPerfilComponent,
    RutaResumenComponent,
    ModalPagoComponent,
    RutaCuentasComponent,
    RutaProductosComponent,
    SidebaradmingeneralComponent,
    NavbaradmingeneralComponent,
    RutaAdmingeneralPerfilComponent,
    AdmingeneralbusquedacomponentComponent,
    ModalRegistrocuentaComponent,
    ModalEliminarcuentaComponent,
    ModalPagoComponent,
    LineChartComponent,
    DoughnutChartComponent,
    AdmingeneralbusqproductosComponent,
    ModalRegistroproductoComponent,
    ModalConfirmareliminarproductoComponent,
    BusquedaOfertasComponent,
    ModalActualizarproductoComponent,
    AdminHomeBoxComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    RutaDashboardComponent,
    RutaAdminPedidosComponent,
    RutaAdminProductosComponent,
    RutaAdminPerfilComponent,
    ModalDetallePedidoComponent,
    RutaPerfiladmingeneralComponent,
    ModalCambiarPasswordComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgChartsModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
