import { Component, OnInit } from '@angular/core';
import { Filtros } from 'src/app/modelos/filtros.modelo';
import { Rango } from 'src/app/modelos/rangoFiltro.modelo';
import { Vehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculosService } from 'src/app/servicios-admin/vehiculos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss'],
  providers: [VehiculosService]
})
export class VehiculosComponent implements OnInit {
  public vehiculoModel: Vehiculo;
  public vehiculoFiltros:Filtros;
  public vehiculoRange:Rango
  public verVehiculoModel:Vehiculo;
  public vehiculoList:any;
  public metaLinks:any;
  public modelos:any;
  public imagen:any = "https://lumation-communication-suite.s3.us-east-2.amazonaws.com/";
  public spinner:any;
  
  newNumerPage: numeroPage = {numero: 0}
  constructor(public _vehiculoService: VehiculosService) {
   // this.vehiculoModel = new Vehiculo(0,"","","",0,"",0,0,0,"",false,0,0,0,{model_id:0, name:"", brand:{brand_id:0, name:""}},{fuel_type_id:0, name:""},{seller_id:0, name:"", email:""})
   
   this.vehiculoModel = new Vehiculo(0,"","","","","",0,0,0,"",0,0,0,0,0,{model_id:0,name:"", brand:{brand_id:0, name:""}},{fuel_type_id:0,name:""},{seller_id:0, name:"",email:""});
   this.vehiculoFiltros = new Filtros("","","","","","","");
   this.vehiculoRange = new Rango("","","","","","","","","","");
   this.verVehiculoModel =  new Vehiculo(0,"","","","","",0,0,0,"",0,0,0,0,0,{model_id:0,name:"", brand:{brand_id:0, name:""}},{fuel_type_id:0,name:""},{seller_id:0, name:"",email:""});
   
  }

  ngOnInit(): void {
    this.mostrarVehiculos();
    this.verModelos();
  }

  crearvehiculo(){
   this._vehiculoService.crearVehiculo(this.vehiculoModel).subscribe(response=>{
    this.mostrarVehiculos();
    console.log(response.data)
     Swal.fire({
      position: 'top-end',
        icon: 'success',
        title: 'Vehiculo creado',
        showConfirmButton: false,
        timer: 2000
    })
   }, error=>{
    Swal.fire({
      position: 'top-end',
        icon: 'error',
        title: error.error.errros,
        showConfirmButton: false,
        timer: 2000
    })
   })
  }

  editarVehiculo(){
    this._vehiculoService.editarvehiculo(this.verVehiculoModel).subscribe(response=>{
      this.mostrarVehiculos();
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Vehiculo actualizado',
          showConfirmButton: false,
          timer: 2000
      })
    },err=>{
      let array = err.error.errors;
      let errores = Object.values(array)
      Swal.fire({
        position: 'center',
          icon: 'error',
          title: errores,
          showConfirmButton: false,
          timer: 2000
      })
      
    })
  }

  mostrarVehiculos(){
    this._vehiculoService.obtenerVehiculos().subscribe(response=>{
    this.vehiculoList = response.data;
    this.metaLinks = response.meta.links
    this.spinner = response.data.length;
    })
  }

  mostrarVehiculosPag(url:any){
    this._vehiculoService.obtenerVehiculosPaginacion(url).subscribe(response=>{
      this.vehiculoList = response.data;
      this.metaLinks = response.meta.links;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })

    }, err=>{
      console.log(<any>err)
    }) 
  }

  cantidadItems(){
    this._vehiculoService.obtenerNumPag(this.newNumerPage.numero).subscribe(response =>{
      this.vehiculoList = response.data
      this.newNumerPage.numero = 0;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'succcess',
          showConfirmButton: false,
          timer: 2000
      })
    }, error=>{
      Swal.fire({
        position: 'center',
          icon: 'error',
          title: error.error.errors.per_page,
          showConfirmButton: false,
          timer: 2000
      })
      this.newNumerPage.numero = 0;
    })
  }

  verVehiciculos(id:any){
    this._vehiculoService.verVehiculo(id).subscribe(response=>{
    this.verVehiculoModel = response.data
    this.verVehiculoModel.image = this.verVehiculoModel.image.replace(this.imagen,"");
    this.verVehiculoModel.price = this.verVehiculoModel.price.replace(".00","").replace(",","")  
    })
  }

  verModelos(){
   this._vehiculoService.listadoModelos().subscribe(reponse=>{
   this.modelos = reponse.meta.total;  
   }) 
  }

  buscarFiltros(){
   
    let location:any;
    let color:any;
    let model_id:any;
    let brand_id:any;
    let fuel_type_id:any;
    let seller_id:any;
    let sold:any;

    location = "?" + "filter[location]=" + this.vehiculoFiltros.location;
    color = "&" + "filter[color]=" + this.vehiculoFiltros.color;
    model_id = "&" + "filter[model_id]=" + this.vehiculoFiltros.model_id;
    
    brand_id = "&" + "filter[brand_id]=" + this.vehiculoFiltros.brand_id;
    fuel_type_id = "&" + "filter[fuel_type_id]=" + this.vehiculoFiltros.fuel_type_id;
    seller_id = "&" + "filter[seller_id]=" + this.vehiculoFiltros.seller_id;
    sold = "&" + "filter[sold]=" + this.vehiculoFiltros.sold;

    this._vehiculoService.busquedaFiltro(location,color,model_id,brand_id,fuel_type_id,seller_id,sold).subscribe(reponse=>{
      console.log(reponse)
      if(reponse.data.length > 0){
        Swal.fire({
          position: 'center',
            icon: 'success',
            title: 'Vehiculo Encontrado',
            showConfirmButton: false,
            timer: 2000
        })
        this.vehiculoList = reponse.data;
      }else{
        Swal.fire({
          position: 'center',
            icon: 'error',
            title: 'No hay datos',
            showConfirmButton: false,
            timer: 2000
        })
        this.vehiculoList = reponse.data
      }
     
    }, err=>{
      console.log(<any>err.error.errors)
    })

  }

  buscarRango(){

    let yearsRange:any;
    let priceRange:any;
    let engineRange:any;
    let cylinderRange:any;
    let doorsRange:any;

    if(!this.vehiculoRange.yearsRange1){
      yearsRange = "?" + "filter[yearsRange]=";

    }else{
      yearsRange = "?" + "filter[yearsRange]=" + this.vehiculoRange.yearsRange1 +","+ this.vehiculoRange.yearsRange2;
    }

    if(!this.vehiculoRange.priceRange1 || !this.vehiculoRange.priceRange2){
      priceRange = "&" + "filter[priceRange]="
    }else{
      priceRange = "&" + "filter[priceRange]=" + this.vehiculoRange.priceRange1 + "," + this.vehiculoRange.priceRange2;
    }

    if(!this.vehiculoRange.engineRange1 || !this.vehiculoRange.engineRange2){
      engineRange = "&" + "filter[engineRange]="; 
    }else{
      engineRange = "&" + "filter[engineRange]=" + this.vehiculoRange.engineRange1 + "," + this.vehiculoRange.engineRange2; 
    }
    if(!this.vehiculoRange.cylindersRange1 || this.vehiculoRange.cylindersRange2 ){
    cylinderRange = "&" + "filter[cylindersRange]=";
    }else{
      cylinderRange = "&" + "filter[cylindersRange]=" + this.vehiculoRange.cylindersRange1 + "," + this.vehiculoRange.cylindersRange2;

    }
    if(!this.vehiculoRange.doorsRange1 || !this.vehiculoRange.doorsRange2){
    doorsRange = "&" + "filter[doorsRange]=";
    }else{
      doorsRange = "&" + "filter[doorsRange]=" + this.vehiculoRange.doorsRange1 + "," + this.vehiculoRange.doorsRange2;

    }

    
    this._vehiculoService.busquedaFiltroRango(yearsRange,priceRange, engineRange, cylinderRange, doorsRange).subscribe(response=>{
      
      if(response.data.length === 0){
        Swal.fire({
          position: 'center',
            icon: 'error',
            title: 'No hay concidencias',
            showConfirmButton: false,
            timer: 2000
        })
        this.vehiculoList = response.data
      }else{
        this.vehiculoList = response.data
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Vehiculo Encontrados',
          showConfirmButton: false,
          timer: 2000
      })
      }
    }, err=>{
      console.log(<any> err);
      Swal.fire({
        position: 'center',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
      })

    })
  }

  ordenPrice(precio:any){
    this._vehiculoService.ordenamientoPrecio(precio).subscribe(response=>{
      this.vehiculoList = response.data;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
    }, err =>{
      console.log(<any>err)
    })
  }
  
  ordenCylanders(cylinders:any){
    this._vehiculoService.ordenamientoCylinders(cylinders).subscribe(response=>{
      this.vehiculoList = response.data;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
    }, err=>{
      console.log(<any>err)
    })
  }

  orderDoors(doors:any){
    this._vehiculoService.ornamientoPuertas(doors).subscribe(response=>{
      this.vehiculoList = response.data;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
    }, err => {
      console.log(<any> err)
    })
  }

  ordenYear(year:any){
    this._vehiculoService.ordenaminentoAño(year).subscribe(response=>{
      this.vehiculoList = response.data;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
    }, err =>{
      console.log(<any> err)
    })
  }

  orderCreated(create:any){
    this._vehiculoService.ordenamientoCreado(create).subscribe(response=>{
      this.vehiculoList = response.data;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
    }, err=>{
      console.log(<any> err)
    })
  }
  
  orderEngine(engyne:any){
    this._vehiculoService.ordenamientoEngine(engyne).subscribe(response=>{
      this.vehiculoList = response.data;
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
    }, err=>{
      console.log(<any> err)
    })
  }

}
interface numeroPage {
  numero: Number; 
}