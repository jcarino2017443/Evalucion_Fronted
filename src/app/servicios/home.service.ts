import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 public ruta: String;
  constructor(private _http: HttpClient) {
    this.ruta = GLOBAL.url
   }

   obtenerModelos(url:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    if(!url){
      return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/models', {headers: headersVariable})
    }else{
      return this._http.get(url, {headers: headersVariable})
    }
   }

   obtenerMarcas():Observable<any>{
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/brands', {headers: headersVariable});
   }
   obtenerCombustible():Observable<any>{
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/fuel_types', {headers: headersVariable})
   }
}
