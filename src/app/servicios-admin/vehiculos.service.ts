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

   verVehiculo(id:any):Observable<any>{
     let headersVariable = new HttpHeaders().set("Content-Type", "application/json").append("Authorization", "Bearer " +localStorage.getItem('Token'))
     return this._http.get(this.ruta + "demo-api.lumationsuite.com/index.php/api/vehicles/"+ id, {headers:headersVariable})
   }

   obtenerVehiculos(): Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles', {headers:headersVariable})
    
   }
   obtenerVehiculosPaginacion(url:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(url, {headers: headersVariable})
   }

   obtenerNumPag(num:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token')) 
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles?per_page=' + num, {headers: headersVariable});
   }


   busquedaFiltro(location:any,color:any,model_id:any, brand_id:any, fuel_type_id:any, seller_id:any,sold:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles'+location+color+model_id+brand_id+fuel_type_id+seller_id+sold,{headers:headersVariable})
   
   }
   busquedaFiltroRango(yearsRange:any, priceRange:any, engineRange:any, cylinderRange:any, doorsRange:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles'+ yearsRange + priceRange + engineRange+ cylinderRange + doorsRange, {headers:headersVariable})
   
   }

   ordenamientoPrecio(price:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta  + 'demo-api.lumationsuite.com/index.php/api/vehicles?sort=' + price, {headers: headersVariable})
   }
   ordenamientoCylinders(Cylinders:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles?sort=' + Cylinders, {headers: headersVariable})
   }
   ornamientoPuertas(puertas:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles?sort=' + puertas, {headers: headersVariable});
   }
   ordenaminentoAño(year: any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles?sort=' + year, {headers: headersVariable});
   }
   ordenamientoCreado(create:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles?sort='+ create, {headers:headersVariable});
   }
   ordenamientoEngine(engine:any):Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/vehicles?sort=' + engine, {headers:headersVariable});
   }

   listadoModelos():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'))
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/models', {headers: headersVariable})
   }

   añadirImagen(imagen:any): Observable<any>{
    
    
     const formData = new FormData();
     formData.append('image' , imagen)
     var filesHttpOptions = {

      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('Token'),

      }).set("Access-Control-Allow-Origin", "*")
      }
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token')).set("Access-Control-Allow-Origin", "*");
    return this._http.post(this.ruta + 'demo-api.lumationsuite.com/index.php/api/uploads', formData, filesHttpOptions)
   }

}
