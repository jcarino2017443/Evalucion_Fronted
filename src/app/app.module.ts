import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { VehiculoPublicoComponent } from './componentes/vehiculo-publico/vehiculo-publico.component';

import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { PanelAdminComponent } from './componentes/panel-admin/panel-admin.component';
import { UsuariosComponent } from './componentes/Administrador/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    VehiculoPublicoComponent,
    
    CatalogoComponent,
         PanelAdminComponent,
         UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
