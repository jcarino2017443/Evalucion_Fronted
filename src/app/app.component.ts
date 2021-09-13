import { Component, OnInit, DoCheck } from '@angular/core';
import { RegistroService } from './servicios/registro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RegistroService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'EvalucionFronted';
  public token:String;

  constructor(private _registreService: RegistroService){

  }
  ngOnInit(){
    this.token = this._registreService.getToken()
  }
  ngDoCheck(){
    this.token = this._registreService.getToken()
  }
}
