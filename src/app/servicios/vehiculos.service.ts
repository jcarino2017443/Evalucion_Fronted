import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
   }

   vehiculoPublico(): Observable<any>{
      return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/public/vehicles', {headers: this.headersVariable});
   }

   obtnerFiltros(location:any, color:any, model_id:any, brand_id:any, fuel_type_id:any, seller_id:any ,yearsRange:any):Observable<any>{
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/public/vehicles' + location + color   + model_id + brand_id + fuel_type_id + fuel_type_id +seller_id + yearsRange, {headers: this.headersVariable})
   }

   obtenerMarcas():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/brands', {headers: headersVariable})
    }
   
}
