import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { GLOBAL } from './global.service';
import { Usuario } from '../modelos/usuario.modelos';
import { Logout } from '../modelos/logout.modelo';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  public ruta: String;
  public token: any;
  public identidad: any;
  public localStorage:any = localStorage.getItem('identidad');
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
   }

   login(usuario:Usuario): Observable<any>{
     let params = JSON.stringify(usuario);
     return this._http.post(this.ruta + 'demo-api.lumationsuite.com/index.php/api/login', params, {headers: this.headersVariable})

   }

   crearUsuario(usuario: Usuario): Observable<any>{
     let headersToken = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + this.getToken());
     let params = JSON.stringify(usuario);
     return this._http.post(this.ruta + 'demo-api.lumationsuite.com/index.php/api/users', params, {headers: headersToken})

   }

   cerrarSesion():Observable<any>{
     
     let headersToken = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' +  this.getToken())
     return this._http.post(this.ruta + 'demo-api.lumationsuite.com/index.php/api/logout', {headers: headersToken})
   }

   /*-------------------------------------Token-----------------------------------*/

   getToken(){
     var token2 = localStorage.getItem('Token')
     if(token2 != 'undefined'){
       this.token = token2
      
     }else{
       this.token = null;
     }
     return this.token;
     
   }

}
