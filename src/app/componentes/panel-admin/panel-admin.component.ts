import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss'],
  providers: [RegistroService]
})
export class PanelAdminComponent implements OnInit {

  constructor(public _registroService: RegistroService) { }

  ngOnInit(): void {
  }

}
