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
    
    }, (err)=>{
      console.log(<any>err.error.errors)
      var password1:String= err.error.errors.password;
      var email:String= err.error.errors.email;
      var name:String= err.error.errors.name;
      var numero: String= err.error.errors.phone_number;
      var identidad:String= err.error.errors.identification

      var mostrar:any

      if(name){
        mostrar  = ' *' + name; 
      }else{
        name =''
      }

      if(email){
        if(name){
          mostrar =  mostrar + ' *'+ email;
        }else{
          mostrar = email
        }
      }else{
        email = ''
      }

      if(numero){
        if(name || email){
          mostrar = mostrar + ' *'+numero ;
        }else{
          mostrar = numero
        }
      }else{
        numero = ''
      }

      if(identidad){
        if (name || email || numero) {
          mostrar = mostrar + ' *'+ identidad
        }else{
          mostrar = identidad;
        }
      }else{
        identidad = ''
      }

      if(password1){
        if( name || email || numero || identidad){
          mostrar = mostrar + ' *'+ password1;
        }else{
          mostrar = password1[0].replace('The password must contain at least one uppercase and one lowercase letter.','La contraseña debe contener al menos una letra mayúscula y una minúscula.')
                             .replace('The password must contain at least one symbol.','debe contener al menos un símbolo.')
                             .replace('The password must contain at least one number.','debe contener al menos un número');
        }
      }else{
        password1 = '';
      }

      console.log(mostrar)
  
      if(this.usuarioModel.password != this.usuarioModel.password_confirmation){
        mostrar = password1;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: mostrar,
          showConfirmButton: false,
          timer: 10000
        })
      }
  
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: mostrar,
          showConfirmButton: false,
          timer: 10000
        })
    })
  }
}
