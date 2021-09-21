import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';





@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss', ], 
  providers: [RegistroService]
})
export class CatalogoComponent implements OnInit {
  public formLogin: FormGroup;
  public min: number = 2;
  public max: number = 10;
  

  constructor(public _registroService: RegistroService, public builder:FormBuilder) { }
  
  ngOnInit(): void {
  this.formLogin = this.builder.group({
    email: ['' , Validators.compose([
      Validators.required, 
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ])],
    name: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', Validators.compose([
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
      

    ]) ],
    check: ['', [Validators.required, Validators.requiredTrue]],
   })
  }

  send():any{
    console.log(this.formLogin.value)
  }

  

  
}
