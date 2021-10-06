import { Component, OnInit } from '@angular/core';
import { Ventas } from 'src/app/modelos/ventas.modelo';

import { ReportesService } from 'src/app/servicios-admin/reportes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [ReportesService]
})
export class ReportesComponent implements OnInit {
  public link:any;
  public ventasFecha:Ventas;
  public fechaActual:any
  constructor(private _reporteService: ReportesService) {
    this.ventasFecha = new Ventas ("","","","","","","","","")
   }

  ngOnInit(): void {
    this.saberFecha()
  }

  reportesExcel(){
    this._reporteService.generarReportes().subscribe(response=>{
      this.link = response.filepath;
      console.log(response.filepath);
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
      window.location.href=response.filepath;
    })
  }

  reporteFechas(){
    let fechaini:any;
    let fechaFinal:any;
    let buscarFecha:any;

    if(fechaini != "" &&(fechaFinal != "")){
      buscarFecha =  "filter[dateRange]=" + this.ventasFecha.created_at1 + "," + this.ventasFecha.created_at2;
    }else{
      buscarFecha = "filter[dateRange]="
    }

    this._reporteService.generarReportesFecha(buscarFecha).subscribe(response=>{
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
      })
      window.location.href=response.filepath;
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

  
}
