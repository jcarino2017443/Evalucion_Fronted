import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logout } from 'src/app/modelos/logout.modelo';
import { Usuario } from 'src/app/modelos/usuario.modelos';
import { RegistroService } from 'src/app/servicios/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [RegistroService]
})
export class RegistroComponent implements OnInit {
  public usuarioModel: Usuario;
  
 

  constructor(public _registroService: RegistroService, public _router: Router) {
    this.usuarioModel = new Usuario(0,"","","","",3,{role_id:0, name:""},"","");
  
   }

  ngOnInit(): void {
  }
  registrar(){
    this._registroService.crearUsuario(this.usuarioModel).subscribe((response)=>{
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 2000
    })
    this._router.navigate(['/login'])
    
    }, (error)=>{
      console.log(<any>error.error.errors)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.error.errors,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
