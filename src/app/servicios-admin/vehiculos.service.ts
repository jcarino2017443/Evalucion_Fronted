import { Injectable } from '@angular/core';
import { GLOBAL } from '../servicios/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../modelos/vehiculo.modelo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  public ruta:any;

  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
   }

   crearVehiculo(vehiculo:Vehiculo): Observable<any>{
    let params = JSON.stringify(vehiculo);
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.post(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles', params, {headers: headersVariable})
   }

   editarvehiculo(vehiculo:Vehiculo):Observable<any>{
    let params = JSON.stringify(vehiculo);
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.put(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles/'+ vehiculo.vehicle_id, params, {headers: headersVariable} )
   }

   obtenerVehiculos(): Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles'  , {headers:headersVariable})

   }

}
