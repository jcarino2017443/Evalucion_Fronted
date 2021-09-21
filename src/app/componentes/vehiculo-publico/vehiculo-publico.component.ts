import { Component, OnInit } from '@angular/core';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-vehiculo-publico',
  templateUrl: './vehiculo-publico.component.html',
  styleUrls: ['./vehiculo-publico.component.scss'],
  providers: [VehiculosService]
})
export class VehiculoPublicoComponent implements OnInit {
  public vehiculoList:any;
  public estado:any;

  constructor(public _vehiculoService: VehiculosService) { }

  ngOnInit(): void {
      this.mostrarVehiculos()
  }

  mostrarVehiculos(){
    this._vehiculoService.vehiculoPublico().subscribe(response=>{
      console.log(response.data);
      this.vehiculoList = response.data;
      this.estado = response.data.length;
    }, error =>{
      console.log(error);
      
    })
  }

}
