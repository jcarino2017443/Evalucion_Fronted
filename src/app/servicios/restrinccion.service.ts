import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {RegistroService} from './registro.service'

@Injectable({
  providedIn: 'root',
  
})
export class RestrinccionService implements CanActivate{

  constructor(public _registroService: RegistroService, public _router:Router) {

   }

   canActivate(){
     let identidad = this._registroService.getIdentidad();
     if(identidad && (identidad.role.name === 'Administrador' || identidad.role.name === 'Vendedor')){
       return true
       
     }else{
       this._router.navigate(['/login'])
       return false
     }

   }
   

   
}
