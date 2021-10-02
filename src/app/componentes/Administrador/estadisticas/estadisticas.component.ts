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
public variable:any=null;



  public marcaVendidaName:any;
  public marcaVendidaSales:any;

  public menosVendidaName:any;
  public menosVendidaSales:any;

  public vendedorMenosName:any;
  public vendedorMenosCount:any;
  public vendedorMenosEmail:any

  public vendedorMasName:any;
  public vendedorMasCount:any;
  public vendedorMasEmail:any;


chartOption = [
  {valor:'1' },
  {valor:'2' },
  {valor:'3' },
  {valor:'4' },
  {valor:'5' },
]

chartOptionMes = [
  {valor:'1' },
  {valor:'2' },
  {valor:'3' },
  {valor:'4' },
  {valor:'5' },
  {valor:'6' },
  {valor:'7' },
  {valor:'8' },
  {valor:'9' },
  {valor:'10' },
  {valor:'11' },
  {valor:'12' }
]

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
    this.obtenerVentasYear(this.variable);
    this.marcaMasVendida();
    this.marcaMenosVendida();
    this.vendedorMenosVentas();
    this.vendedorMasVentas()
  }

  obtenerVentasYear(dato:any){
    this._estadisticaService.ventasAño(dato).subscribe(response=>{
      this.promedio = "";
      this.chartData=[];
      this.chartLabels=[];
      console.log(response)
      this.data = response.sales;
      let keys = Object.keys(this.data);

      for (let index = 0; index < keys.length; index++) {
        let clave = keys[index]
        this.chartLabels.push(clave);
        this.chartData.push(this.data[clave]);

      }
    })
  }

  obtenerVentasporMes(data:any){
    this._estadisticaService.ventasMes(data).subscribe(response =>{
    this.promedio = "";
    this.chartData=[];
    this.chartLabels=[];
    this.data = response.sales;
    let keys = Object.keys(this.data);
    for (let index = 0; index < keys.length; index++) {
      let clave = keys[index]
      this.chartLabels.push(clave);
      this.chartData.push(this.data[clave],);
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
      this.marcaVendidaName = response.brand.name;
      this.marcaVendidaSales = response.brand.sales_count;
    })
  }

  marcaMenosVendida(){
    this._estadisticaService.marcaMenosVendida().subscribe(response=>{
      this.menosVendidaName = response.brand.name;
      this.menosVendidaSales = response.brand.sales_count;
    })
  }
  vendedorMenosVentas(){
    this._estadisticaService.topSeller().subscribe(response=>{
      this.vendedorMenosName = response.seller.name;
      this.vendedorMenosCount = response.seller.sales_count;
      this.vendedorMenosEmail = response.seller.email;

    })
  }
  vendedorMasVentas(){
    this._estadisticaService.lowestSeller().subscribe(response=>{
      this.vendedorMasName = response.seller.name;
      this.vendedorMasEmail = response.seller.email;
      this.vendedorMasCount = response.seller.sales_count;
    })
  }



}
