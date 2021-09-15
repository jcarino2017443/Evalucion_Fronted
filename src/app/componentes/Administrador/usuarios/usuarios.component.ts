import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modelos/usuario.modelos';

import { UsuariosService } from 'src/app/servicios-admin/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuariosService]
})



export class UsuariosComponent implements OnInit {
  public usuarioList:any
  public usuaioModel: Usuario
  
  constructor(public _usuarioServices: UsuariosService) {
    this.usuaioModel = new Usuario(0,"","","","",1,{role_id:0, name:""},"","");
   }

  ngOnInit(): void {
    this.mostrarUsuario()
  }

  crearUSuario(){
    this._usuarioServices.crearUsuarios(this.usuaioModel).subscribe(response=>{
      console.log(response.data)
    })
  }
  editarUsuario(){
    this._usuarioServices.editarUsuarios(this.usuaioModel).subscribe(response=>{
      console.log(response.data)
      this.mostrarUsuario()
      Swal.fire({
        position: 'top-end',
          icon: 'success',
          title: 'Usuario Actualizado',
          showConfirmButton: false,
          timer: 2000
      })
    })
  }

  mostrarUsuario(){
    this._usuarioServices.obtenerUsuarios().subscribe(response=>{
      this.usuarioList = response.data;
    },error=>{
      console.log(<any>error)
    })
  }
  
  verUsuario(id:any){
    this._usuarioServices.verUsuario(id).subscribe(response=>{
      this.usuaioModel = response.data;
      
    })
  }

  

}
