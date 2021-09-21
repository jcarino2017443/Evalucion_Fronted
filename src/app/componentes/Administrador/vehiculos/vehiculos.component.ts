import { Component, OnInit } from '@angular/core';
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
  public vehiculoList:any
  constructor(public _vehiculoService: VehiculosService) {
    this.vehiculoModel = new Vehiculo(0,"","","",0,"","",0,0,"",false,0,0,0,{model_id:0, name:"", brand:{brand_id:0, name:""}},{fuel_type_id:0, name:""},{seller_id:0, name:"", email:""})
   }

  ngOnInit(): void {
    this.mostrarVehiculos()
  }

  crearvehiculo(){
   this._vehiculoService.crearVehiculo(this.vehiculoModel).subscribe(response=>{
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

  mostrarVehiculos(){
    this._vehiculoService.obtenerVehiculos().subscribe(response=>{
    this.vehiculoList = response.data;
    })
  }

}
