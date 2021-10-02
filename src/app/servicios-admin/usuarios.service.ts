import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../servicios/global.service';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.modelos';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public ruta:any
  
  constructor(private _http: HttpClient) { 
    this.ruta = GLOBAL.url;

  }
  obtenerUsuarios(): Observable<any>{
    
   
    
    let headersVariable = new HttpHeaders().set("Content-Type", "application/json").append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/users' ,  {headers: headersVariable})
  }

  paginacion(link:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'applicaction/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(link, {headers: headersVariable})
  }

  obtenerUsuarioBy(email:any, id:any, rol:any): Observable<any>{
    let headersVariable = new HttpHeaders().set("Content-Type", "application/json").append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/users/' + email+id+rol,  {headers: headersVariable})
  }
  crearUsuarios(usurio: Usuario):Observable<any>{
    let params = JSON.stringify(usurio)
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.post(this.ruta + 'demo-api.lumationsuite.com/index.php/api/users', params, {headers: headersVariable} )

  }
  editarUsuarios(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.put(this.ruta + 'demo-api.lumationsuite.com/index.php/api/users/' + usuario.id, params, {headers: headersVariable})
  }
  verUsuario(id:any): Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/users/' + id, {headers: headersVariable} )
  }
  numeroUsuarios(numero:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/users?per_page=' + numero, {headers: headersVariable})
  }
}
