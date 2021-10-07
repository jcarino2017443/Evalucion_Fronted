import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.modelos';
import { RegistroService } from 'src/app/servicios/registro.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [RegistroService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;
  public identidad:any;
  public token: any;
  public usuarioLogin:any
  public rol:any;
  
  

  constructor(public _registroService: RegistroService, public _router: Router, public _location: Location){
      this.usuarioModel = new Usuario(0,"","","","",3,{role_id:0, name:""},"","");
      
      
   }

  ngOnInit(): void {
    // -------------------------- bootstrap
    (function () {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()

    

  }
  login(){
    this._registroService.login(this.usuarioModel).subscribe(response=>{
      this.token = response.access_token;
      localStorage.setItem('Token',this.token);
      this.usuario();
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Correcto',
          showConfirmButton: false,
          timer: 3000
      })
      this.redirigir();
      // setInterval(() => {
      //   this.redirigir()
      // }, 3000);
      
    },
    error=>{
      console.log(<any>error);
      var email = error.error.errors.email;
      var password1:String= error.error.errors.password;
      var mensahe:any;

      if(email){
        mensahe = email;
      }else{
        email = ''
      }
      
      if(password1){
        if(email){
          mensahe = mensahe + ' *'+ password1
        }else{
          mensahe = password1
        }
      }else{
        password1 = ''
      }

      Swal.fire({
          position: 'center',
          icon: 'error',
          title: mensahe,
          showConfirmButton: false,
          timer: 3000
      })
    })
  }

  usuario(){
      this._registroService.obtenerUsuario().subscribe(response=>{
      console.log(response.data)
      this.identidad = response.data;
      localStorage.setItem('identidad', JSON.stringify(this.identidad));
      
      
    }, error=>{
      console.log(<any>error)
    })
  }

  redirigir(){
 
      this._router.navigate(['/panelAdmin'])
      setInterval(()=>{window.location.reload()},2000)
      

     
  }

 
}
