import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from 'src/app/servicios-admin/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  providers: [EstadisticasService]
})
export class EstadisticasComponent implements OnInit {
public data:any;
public promedio:any;
public masVendida:any;


chartInicial:any = 'pie'
  chartTypes = [
    {nombreTipo: 'pie', texto: 'Cicular'},
    {nombreTipo: 'line', texto: 'lineas'},
    {nombreTipo: 'bar', texto: 'barras'}
  ]
  chartOptions = {
    responsive: true,
  };
  chartLabels:any[]=[];
  chartData:any[] =[];
  chartColors = [{
    backgroundColor: ['red', '#0F0', 'rgba(41, 182, 246,0.75)', 'black', 'yellow','gray'],
    
  }];
  chartLegend = true;
  chartPlugins = [];
  constructor(private _estadisticaService: EstadisticasService) { }

  
  
  ngOnInit(): void {
    this.obtenerVentasYear();
    this.marcaMasVendida();
  }

  obtenerVentasYear(){
    this._estadisticaService.ventasAño().subscribe(response=>{
      this.promedio = "";
      this.chartData=[];
      this.chartLabels=[];
      console.log(response)
      this.data = response.sales;
      let keys = Object.keys(this.data)
      for (let index = 0; index < keys.length; index++) {
        let clave = keys[index]
        this.chartLabels.push(clave);
        this.chartData.push(this.data[clave]);

      }
    })
  }

  obtenerVentasporMes(){
    this._estadisticaService.ventasMes().subscribe(response =>{
    this.promedio = "";
    this.chartData=[];
    this.chartLabels=[];
    this.data = response.sales;
    let keys = Object.keys(this.data);
    for (let index = 0; index < keys.length; index++) {
      let clave = keys[index]
      this.chartLabels.push(clave);
      this.chartData.push(this.data[clave]);
      this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
      
    }
    })
  }

  ventasPorVendedor(){
    this.promedio = "";
    this.chartData=[];
    this.chartLabels=[];
    this._estadisticaService.porVendedor().subscribe(response=>{
      this.data = response.sales;
      for (let index = 0; index < this.data.length; index++) {
        this.chartLabels.push(this.data[index].name);
        this.chartData.push(this.data[index].sales_count)
        
      }
    })
  }
  obtenerPromedio(){
    this._estadisticaService.promedioVentas().subscribe(response=>{
      this.promedio = response.average;
    })
  }

  marcaMasVendida(){
    this._estadisticaService.marcaVendida().subscribe(response=>{
      this.masVendida = response.brand;
    })
  }


  // for (let i = 0; i < this.pruebasArray.length; i++) {
        //    this.chartLabels.push(this.pruebasArray[i]);
        //   this.chartLabels.push(this.pruebasArray[i].habitantes)
}
