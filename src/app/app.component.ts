import { Component, OnInit, DoCheck } from '@angular/core';
import { RegistroService } from './servicios/registro.service';
import { Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RegistroService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'EvalucionFronted';
  public token:any;
  
  


  constructor(public _registreService: RegistroService,
              private _router: Router,
              private _activeRouter: ActivatedRoute){

  }
  ngOnInit(){
    this.token = this._registreService.getToken();
    
    

  }
  ngDoCheck(){
    this.token = this._registreService.getToken()
    
  }
  

  Logout(){
    this._registreService.cerrarSesion().subscribe(response=>{
      localStorage.clear()
    this.token = null;
    this._router.navigate(['/login'])  
     Swal.fire({
      title: 'goodby everyone.',
      width: 600,
      padding: '3em',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
     })
    window.location.reload;
    })
    
    
  }

  

}
