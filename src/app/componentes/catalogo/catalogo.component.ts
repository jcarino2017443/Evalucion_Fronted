import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss', ], 
  providers: [RegistroService]
})
export class CatalogoComponent implements OnInit {
  
  constructor(public _registroService: RegistroService) { }

  ngOnInit(): void {
    
  }
  
  
}
