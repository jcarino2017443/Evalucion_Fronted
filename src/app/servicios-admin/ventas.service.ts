import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../servicios/global.service';
import { Usuario } from '../modelos/usuario.modelos';
import { Ventas } from '../modelos/ventas.modelo';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public ruta:any
  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
   }

   registrarVenta(ventas: Ventas):Observable<any>{
    let params = JSON.stringify(ventas)
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+ localStorage.getItem('Token'));
    return this._http.post(this.ruta + 'demo-api.lumationsuite.com/index.php/api/sales', params, {headers: headersVariable})
   }
   obtenerVentas():Observable<any>{
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/sales' , {headers: headersVariable});
   }

   obtenerMarcas():Observable<any>{
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/brands', {headers: headersVariable});
   }

   obtenerFiltros(buyer_id, seller_id, model_id, brand_id):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/sales'  + buyer_id + seller_id + model_id + brand_id, {headers: headersVariable});
   }

   obtenerRangos(monton:any, fecha:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/sales' + monton + fecha, {headers: headersVariable});
   }

   ordenamiento(created:any, amount:any):Observable<any>{
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/sales?'+ created + amount, {headers: headersVariable} )
   }
   vehiculosAsignado():Observable<any>{
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles', {headers: headersVariable})
   }
}
