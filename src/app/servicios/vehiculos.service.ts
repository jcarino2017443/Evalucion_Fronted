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
}
