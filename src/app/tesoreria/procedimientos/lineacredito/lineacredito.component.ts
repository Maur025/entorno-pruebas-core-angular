import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-lineacredito',
  templateUrl: './lineacredito.component.html',
  styleUrls: ['./lineacredito.component.scss']
})
export class LineacreditoComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  procedimientos : any = [
    {
      nombre: "Ingreso de Banco",
      formulario : "seleccionbanco",
      datos_entrada:  [

      ],
      datos_salida:  [
        "banco_seleccionado"
      ],
      validado : false
    }
  ]
  step1Validate :boolean = false;

  ngOnInit(): void {

  }


  validar(){
    console.log("validando");
    if (this.procedimientos[0].datos_salida!= null){
      console.log(".procedimientos[0].datos_salida", this.procedimientos[0].datos_salida);
    }
    return false;
  }
  validarSiguiente(event){

    console.log("validando");
    if (this.procedimientos[0].datos_salida!= null){
      console.log(".procedimientos[0].datos_salida", this.procedimientos[0].datos_salida);
      this.procedimientos[0].validado = true;
      this.wizard.goToNextStep();

    }
  }

}
