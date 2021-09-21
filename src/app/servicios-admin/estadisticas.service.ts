import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../servicios/global.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  public ruta: any

  constructor(public _http:HttpClient) {
    this.ruta = GLOBAL.url
   }

  
   ventasAño():Observable <any>{
     let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/salesPerYear', {headers:headersVariable});
   }

   ventasMes():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
     return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/salesPerMonth', {headers:headersVariable});

   }

   promedioVentas():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/averageSale', {headers: headersVariable});
   }

   porVendedor():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/salesPerSeller', {headers: headersVariable})
   }

   marcaVendida():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/mostSoldBrand', {headers: headersVariable})

   }

   marcaMenosVendida():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/leastSoldBrand', {headers:headersVariable});

   }
   topSeller():Observable<any>{
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/topSeller', {headers:headersVariable});

   }

   lowestSeller(){
    let headersVariable = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this._http.get(this.ruta + 'demo-api.lumationsuite.com/index.php/api/stats/lowestSeller', {headers:headersVariable});

   }

}
