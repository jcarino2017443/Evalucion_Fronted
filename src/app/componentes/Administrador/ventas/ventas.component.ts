import { Component, OnInit } from '@angular/core';
import { Ventas } from 'src/app/modelos/ventas.modelo';
import { VentasService } from 'src/app/servicios-admin/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [VentasService]
})
export class VentasComponent implements OnInit {
  public marcas:any
  public ventasFiltros:Ventas;
  public ventasModel:Ventas

  constructor(private _ventasService: VentasService) {
    this.ventasFiltros = new Ventas("","","","","","","","","");
    this.ventasModel = new Ventas ("","","","","","","","","")
   }
  public ventasList:any
  ngOnInit(): void {
    this.obtenerVentasAdmin();
    this.obtenerMarcasCount();
  }

  registrarVentas(){
    this._ventasService.registrarVenta(this.ventasModel).subscribe(response=>{
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: 'Venta Registrada',
          showConfirmButton: false,
          timer: 2000
      })
    }, err=>{
      Swal.fire({
        position: 'center',
          icon: 'error',
          title: err.error.errors,
          showConfirmButton: false,
          timer: 2000
      })
      console.log(<any>err)
    })
  }

  obtenerVentasAdmin(){
    this.ventasFiltros.buyer_id = "";
    this.ventasFiltros.seller_id = "";
    this.ventasFiltros.model_id = "";
    this.ventasFiltros.brand_id = "";
    this._ventasService.obtenerVentas().subscribe(response=>{
      this.ventasList = response.data;
    })
  }

  obtenerMarcasCount(){
    this._ventasService.obtenerMarcas().subscribe(response=>{
    this.marcas = response.data;
    })
  }

  filtros(){

    var buyer_id:any;
    var seller_id:any;
    var model_id:any;
    var brand_id:any;

    if(buyer_id != ""){
      buyer_id = "?" + "filter[buyer_id]=" + this.ventasFiltros.buyer_id;
    }else{
      buyer_id = "?" + "filter[buyer_id]=" 
    }

    if(seller_id != ""){
      seller_id = "&" + "filter[seller_id]=" + this.ventasFiltros.seller_id;
    }else{
      seller_id = "&" + "filter[seller_id]=";
    }

    if(model_id != ""){
      model_id = "&" + "filter[model_id]=" + this.ventasFiltros.model_id;
    }else{
      model_id = "&" + "filter[model_id]=";
    }
    if(brand_id != ""){
      brand_id = "&" + "filter[brand_id]=" + this.ventasFiltros.brand_id;
    }else{
      brand_id = "&" + "filter[brand_id]=";
    }

    this._ventasService.obtenerFiltros(buyer_id,seller_id,model_id, brand_id).subscribe(response=>{
      if(response.data.length > 0){
        Swal.fire({
          position: 'center',
            icon: 'success',
            title: 'success',
            showConfirmButton: false,
            timer: 2000
        })
        this.ventasList = response.data;
      }else{
        Swal.fire({
          position: 'center',
            icon: 'error',
            title: 'No hay datos',
            showConfirmButton: false,
            timer: 2000
        })
        this.ventasList = response.data
      }

    }, err=>{
      console.log(<any> err);
    })

    }


  rangos(){
    var amount:any;
    var dateRange:any;

    if(this.ventasFiltros.amount1 != "" || (this.ventasFiltros.amount2 != "")){
      amount = "?" + "filter[amountRange]=" + this.ventasFiltros.amount1 + "," + this.ventasFiltros.amount2;
    }else{
      amount = "?" + "filter[amountRange]=";
    }

    if(this.ventasFiltros.created_at1 != "" || (this.ventasFiltros.created_at2 != "")){
      dateRange = "&" + "filter[dateRange]=" + this.ventasFiltros.created_at1 + "," + this.ventasFiltros.created_at2;
    }else{
      dateRange = "&" + "filter[dateRange]="
    }

    this._ventasService.obtenerRangos(amount, dateRange).subscribe(response=>{
      if(response.data.length > 0){
        Swal.fire({
          position: 'center',
            icon: 'success',
            title: 'success',
            showConfirmButton: false,
            timer: 2000
        })
        this.ventasList = response.data;
      }else{
        Swal.fire({
          position: 'center',
            icon: 'error',
            title: 'No hay datos',
            showConfirmButton: false,
            timer: 2000
        })
        this.ventasList = response.data
      }
      
    },err=>{
      console.log(<any>err)
    })
  }

  ordenarDatos(created:any, amount:any){
    this._ventasService.ordenamiento(created, amount).subscribe(response=>{
      if(response.data.length > 0){
        Swal.fire({
          position: 'center',
            icon: 'success',
            title: 'success',
            showConfirmButton: false,
            timer: 2000
        })
        this.ventasList = response.data;
      }
    })
  }
    
}
