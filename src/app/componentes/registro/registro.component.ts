import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.usuarioModel = new Usuario("","","","", 2 ,"","")
   }

  ngOnInit(): void {
  }
  registrar(){
    this._registroService.crearUsuario(this.usuarioModel).subscribe((response)=>{
      console.log(response)
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
