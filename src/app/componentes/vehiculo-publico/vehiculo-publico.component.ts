import { Component, OnInit } from '@angular/core';
import { Rango } from 'src/app/modelos/rangoFiltro.modelo';
import { Publico } from 'src/app/modelos/vehiculo-publico.modelo';
import { Vehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo-publico',
  templateUrl: './vehiculo-publico.component.html',
  styleUrls: ['./vehiculo-publico.component.scss'],
  providers: [VehiculosService]
})
export class VehiculoPublicoComponent implements OnInit {
  public vehiculoList:any;
  public vehiculoModel:Publico;
  public rangeModel: Rango;
  public estado:any;
  public marcas:any;
  public fechaActual:any

  constructor(public _vehiculoService: VehiculosService) { 
    this.vehiculoModel = new Publico("","","","","","","","","")
    this.rangeModel = new Rango("","","","","","","","","","")
  }

  ngOnInit(): void {
      this.mostrarVehiculos();
      this.verMarcas();
      this.saberFecha();
  }

  mostrarVehiculos(){

    this._vehiculoService.vehiculoPublico().subscribe(response=>{
      this.vehiculoModel.location = "";
      this.vehiculoModel.color = "";
      this.vehiculoModel.model_id = "";
      this.vehiculoModel.brand_id = "";
      this.vehiculoModel.fuel_type_id = "";
      this.vehiculoModel.seller_id = "";
      this.rangeModel.yearsRange1 = "";
      this.rangeModel.yearsRange2 = "";

      this.vehiculoList = response.data;
      this.estado = response.data.length;
    }, error =>{
      console.log(error);
      
    })
  }

  filtroVehiculoPublico(){
    var location	:any;
    var color	:any;
    var model_id:any;
    var brand_id:any;
    var fuel_type_id:any;
    var seller_id:any;
    var yearsRange:any;

    if(location != ""){
      location = "?" + "filter[location]=" + this.vehiculoModel.location;
    }else{
      location = "?" + "filter[location]="
    }
    if(color != ""){
      color = "&" + "filter[color]=" + this.vehiculoModel.color;
    }else{
      color = "&" + "filter[color]=";
    }

    if(model_id	!= ""){
      model_id = "&" + "filter[model_id]="+ this.vehiculoModel.model_id;
    }else{
      model_id = "&" + "filter[model_id]=";
    }

    if(brand_id != ""){
      brand_id = "&" + "filter[brand_id]=" + this.vehiculoModel.brand_id;
    }else{
      brand_id = "&" + "filter[brand_id]=";
    }

    if(fuel_type_id	!= ""){
      fuel_type_id = "&" + "filter[fuel_type_id]=" + this.vehiculoModel.fuel_type_id;
    }else{
      fuel_type_id = "&" + "filter[fuel_type_id]=";
    }

    if(seller_id != ""){
      seller_id = "&" + "filter[seller_id]=" + this.vehiculoModel.seller_id;
    }else{
      seller_id = "&" + "filter[seller_id]="
    }

    if(this.rangeModel.yearsRange1 != "" && (this.rangeModel.yearsRange2 != "")){
      yearsRange = "&" + "filter[yearsRange]=" + this.rangeModel.yearsRange1 + "," + this.rangeModel.yearsRange2;
    }else{
      yearsRange = "&" + "filter[yearsRange]="
    }

    this._vehiculoService.obtnerFiltros(location, color,model_id, brand_id,fuel_type_id,seller_id, yearsRange).subscribe(response=>{
      if(response.data.length > 0){
        Swal.fire({
          position: 'top-end',
            icon: 'success',
            title: 'success',
            showConfirmButton: false,
            timer: 2000
        })
        this.vehiculoList = response.data;
      }else{
        Swal.fire({
          position: 'top-end',
            icon: 'error',
            title: 'No hay concidencias',
            showConfirmButton: false,
            timer: 2000
        })
        this.vehiculoList = response.data;

      }
      
    })
    
  }

  saberFecha(){
    
    var today:any = new Date();
    var dd:any = today.getDate();
    var mm:any = today.getMonth() + 1; //January is 0!
    var aaaa:any = today.getFullYear();
    
    if (dd < 10) {
      dd = '0' + dd;
    }
    
    if (mm < 10) {
      mm = '0' + mm;
    }
    
    today = aaaa + '-' + mm + '-' + dd;
    this.fechaActual = today;
      
      }

  verMarcas(){
    this._vehiculoService.obtenerMarcas().subscribe(response=>{
      this.marcas = response.data;
    })
  }

}
