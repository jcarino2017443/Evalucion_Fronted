import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/Administrador/usuarios/usuarios.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PanelAdminComponent } from './componentes/panel-admin/panel-admin.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component:LoginComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'panelAdmin', component: PanelAdminComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: '**', component:HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
