
import { Component, OnInit, Input } from '@angular/core';
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
  public crearUsuario:Usuario;
  public paginacion:any;

  public pageActual:any
  public user:Usuario
  public buscarDato: Usuario
  public largo:any 

  newNumerPage: numeroPage = {numero: 0}
  
  constructor(public _usuarioServices: UsuariosService) {
    this.usuaioModel = new Usuario(0,"","","","",1,{role_id:0, name:""},"","");
    this.crearUsuario = new Usuario(0,"","","","",1,{role_id:0, name:""},"","");

    this.user = new Usuario(0,"","","","",1,{role_id:0, name:""},"","")
    this.buscarDato = new Usuario(0,"","","","",1,{role_id:0, name:""},"","")
   }

  ngOnInit(): void {
    this.mostrarUsuario()
    this.pageActual;
  }

  crearUSuario(){
    this._usuarioServices.crearUsuarios(this.crearUsuario).subscribe(response=>{
      console.log(response.data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario creado',
        showConfirmButton: false,
        timer: 2000
      })
    },err=>{
      var password1:String= err.error.errors.password;
      var email:String= err.error.errors.email;
      var role_id:String= err.error.errors.role_id;
      var name:String= err.error.errors.name;
      var numero: String= err.error.errors.phone_number;
      var identidad:String= err.error.errors.identification;
      
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

      if(role_id){
        if(name && email){
          mostrar = mostrar + ' *'+ role_id;
        }else{
          mostrar = role_id
        }
      }else{
        role_id = ''
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

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: mostrar,
          showConfirmButton: false,
          timer: 10000
        })

      
    })
  }
  editarUsuario(){
    this._usuarioServices.editarUsuarios(this.usuaioModel).subscribe(response=>{
      
      this.mostrarUsuario()
      Swal.fire({
        position: 'top-end',
          icon: 'success',
          title: 'Usuario Actualizado',
          showConfirmButton: false,
          timer: 2000
      })
    }, err=>{
      var password1:String= err.error.errors.password;
      
      var mostrar:any
      if(password1[0] || password1[1] || password1[2]){
        mostrar = password1[0] || password1[1] || password1[2];
      }

      if(this.usuaioModel.password != this.usuaioModel.password_confirmation){
        mostrar = password1;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: mostrar,
          showConfirmButton: false,
          timer: 10000
        })

      }
    })
  }

  mostrarUsuario(){
    this._usuarioServices.obtenerUsuarios().subscribe(response=>{
      this.usuarioList = response.data;
      this.largo = response.data.length;
      this.paginacion = response.meta.links;
      this.pageActual = response.meta.current_page;
      this.buscarDato.email = "";
      this.buscarDato.identification = "";
      this.buscarDato.role_id = 0;
      console.log(response.meta.links)
    },error=>{
      console.log(<any>error)
    })
  }
  verUsuario(id:any){
    this._usuarioServices.verUsuario(id).subscribe(response=>{
      
      this.usuaioModel = response.data;
      
    })
  }

  paginacionUsuario(link:any){
      this._usuarioServices.paginacion(link).subscribe(response=>{
        this.paginacion = response.meta.links
        this.usuarioList = response.data;
        this.pageActual = response.meta.current_page;
        
      
    })
  }
  
  buscador(){
    let email:any;
    let identification:any;
    let role_id:any;
    let opcional="?"
    
    

    email = opcional + "filter[email]=" + this.buscarDato.email;
    identification = "&" + "filter[identification]=" + this.buscarDato.identification;
    role_id =  "&" + "filter[role_id]=" + this.buscarDato.role_id;
    
    if(role_id === 1){
      this.buscarDato.role_id = 0;
    }

    
    this._usuarioServices.obtenerUsuarioBy(email,identification,role_id).subscribe(response=>{
      console.log(this.buscarDato.email, "+", this.buscarDato.identification,"+", this.buscarDato.role_id)
      if(response.data.length !== 0){
        Swal.fire({
          position: 'center',
            icon: 'success',
            title: 'Usuario Encuentra',
            showConfirmButton: false,
            timer: 2000
        })
        this.usuarioList = response.data;
      }else{
        Swal.fire({
          position: 'center',
            icon: 'error',
            title: 'No hay datos',
            showConfirmButton: false,
            timer: 2000
        })
        this.usuarioList = response.data;
      }
      
      

    }, error=>{
      Swal.fire({
        position: 'center',
          icon: 'error',
          title: 'No hay datos',
          showConfirmButton: false,
          timer: 2000
      })
    })

  }

  cantidadUsuario(){
    this._usuarioServices.numeroUsuarios(this.newNumerPage.numero).subscribe(response=>{
      this.usuarioList = response.data
      this.newNumerPage.numero = 0;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'succcess',
          showConfirmButton: false,
          timer: 2000
      })
    }, error=>{
      
        Swal.fire({
          position: 'center',
            icon: 'error',
            title: error.error.errors.per_page,
            showConfirmButton: false,
            timer: 2000
        })
        this.newNumerPage.numero = 0;
      
    }) 
  }
}

interface numeroPage {
  numero: Number; 
}
