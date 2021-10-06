import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public title:String;
  public marcas:any;
  public modelos:any;
  public combustible:any;
  public pagination:any;
  public links:any;
  public length:any
  constructor(private _homeService:HomeService) { 
    this.title = "Predio de Vehiculos"
  }

  ngOnInit(): void {
    this.getMarcas();
    this.getCombustible();
    this.getModelos(this.links);
    
  }

  getMarcas(){
    this._homeService.obtenerMarcas().subscribe(responsea=>{
      this.marcas = responsea.data;
    })
  }

  getModelos(url:any){
    this._homeService.obtenerModelos(url).subscribe(responseb=>{
      this.modelos = responseb.data;
      this.pagination = responseb.meta.links;
      this.length = responseb.meta.total;
    })
  }

  getCombustible(){
    this._homeService.obtenerCombustible().subscribe(responsec=>{
      this.combustible = responsec.data
    })
  }

}
