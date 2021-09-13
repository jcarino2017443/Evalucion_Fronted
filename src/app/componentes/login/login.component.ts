import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logout } from 'src/app/modelos/logout.modelo';
import { Usuario } from 'src/app/modelos/usuario.modelos';
import { RegistroService } from 'src/app/servicios/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [RegistroService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;
  public token: any;
  public logoutModel:Logout;
  

  constructor(public _registroService: RegistroService, public _router: Router){
      this.usuarioModel = new Usuario("","","","",0,"","");
      this.logoutModel = new Logout("");
   }

  ngOnInit(): void {
  }
  login(){
    this._registroService.login(this.usuarioModel).subscribe(response=>{
      console.log(response);
      this.token = response.access_token;
      localStorage.setItem('Token',this.token)
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Correcto',
          showConfirmButton: false,
          timer: 1500
      })
      this._router.navigate(['/home']);
    },
    error=>{
      console.log(<any>error);
      var fail = JSON.stringify(error.error.errors)
      
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: fail,
          showConfirmButton: false,
          timer: 3000
      })
    })
  }

  Logout(){
    this._registroService.cerrarSesion().subscribe(response =>{
      console.log(response.message);
      localStorage.clear()
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.response.menssage,
          showConfirmButton: false,
          timer: 1500
      })
    }, err=>{
      console.log(<any>err)
    })    
  }

}
