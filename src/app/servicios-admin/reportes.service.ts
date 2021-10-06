import { Injectable } from '@angular/core';
import { GLOBAL } from '../servicios/global.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
public ruta:any
  constructor(private _http: HttpClient) { 
    this.ruta = GLOBAL.url
  }

generarReportes():Observable<any>{
  let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
  return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/export/sales', {headers: headersVariable})
}

generarReportesFecha(fecha:any):Observable<any>{
  let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
  return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/export/sales?' + fecha, {headers: headersVariable})
}

}
