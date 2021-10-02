import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { ChartsModule } from '@rinminase/ng-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { VehiculoPublicoComponent } from './componentes/vehiculo-publico/vehiculo-publico.component';

import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { PanelAdminComponent } from './componentes/panel-admin/panel-admin.component';
import { UsuariosComponent } from './componentes/Administrador/usuarios/usuarios.component';
import { VehiculosComponent } from './componentes/Administrador/vehiculos/vehiculos.component';

//servicio
import { RegistroService } from './servicios/registro.service';
import { RestrinccionService } from './servicios/restrinccion.service';
import { EstadisticasComponent } from './componentes/Administrador/estadisticas/estadisticas.component';
import { VentasComponent } from './componentes/Administrador/ventas/ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    VehiculoPublicoComponent,
    
    CatalogoComponent,
         PanelAdminComponent,
         UsuariosComponent,
         VehiculosComponent,
         EstadisticasComponent,
         VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
    
    
    
  ],
  providers: [RegistroService, RestrinccionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
