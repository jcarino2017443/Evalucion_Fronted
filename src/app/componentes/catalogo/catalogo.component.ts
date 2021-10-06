import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/servicios-admin/usuarios.service';
import { Usuario } from 'src/app/modelos/usuario.modelos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss', ], 
  providers: [RegistroService, UsuariosService]
})
export class CatalogoComponent implements OnInit {
  public formLogin: FormGroup;
  public min: number = 2;
  public max: number = 10;
  public ModelUsuario:Usuario
  

  constructor(public _registroService: RegistroService, public _usuarioServices: UsuariosService, public builder:FormBuilder) { 
    this.ModelUsuario = new Usuario(0,"","","","",0, {role_id:0, name:""}, "","");
  }
  
  ngOnInit(): void {
  this.verUsuario() 
  this.formLogin = this.builder.group({
    email: ['' , Validators.compose([
      Validators.required, 
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ])],
    name: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', Validators.compose([
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
      

    ]) ],
    check: ['', [Validators.required, Validators.requiredTrue]],
   })
  }

  send():any{
    console.log(this.formLogin.value)
  }

  EditarPerfil(){
    this._usuarioServices.editarUsuarios(this.ModelUsuario).subscribe(response=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Perfil editado',
        showConfirmButton: false,
        timer: 2000
      })
      this.ModelUsuario = response.data;

    }, err=>{
      var password1:String= err.error.errors.password;
      
      
      var mostrar:any
      if(password1[0] || password1[1] || password1[2]){
        mostrar = password1[0] || password1[1] || password1[2];
      }

      if(this.ModelUsuario.password != this.ModelUsuario.password_confirmation){
        mostrar = password1;
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

  verUsuario(){
    this._usuarioServices.verUsuario(this._registroService.getIdentidad().id).subscribe(response=>{
      this.ModelUsuario = response.data;
      console.log(response.data.id)
    })
  }

  

  
}
