import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  

  constructor(public _registroService: RegistroService, public _router: Router){
      this.usuarioModel = new Usuario("","","","",0,"","");
   }

  ngOnInit(): void {
  }
  login(){
    this._registroService.login(this.usuarioModel).subscribe(response=>{
      console.log(response);
      this.token = response.access_token;
      localStorage.setItem('token',this.token)
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Correcto',
          showConfirmButton: false,
          timer: 1500
      })
      this._router.navigate(['/registro']);
    },
    error=>{
      console.log(<any>error);
      Swal.fire({
        position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
      })
    })
  }

}
