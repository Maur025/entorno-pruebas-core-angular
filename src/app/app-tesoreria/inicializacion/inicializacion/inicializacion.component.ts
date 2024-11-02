import { Component } from '@angular/core';

@Component({
  selector: 'app-inicializacion',
  templateUrl: './inicializacion.component.html',
  styleUrls: ['./inicializacion.component.scss']
})
export class InicializacionComponent {
  breadCrumbItems: object[];
  optionListInitialization: any[]=[];
  selectLabel:string = "";
  selectInicializacion:any;
  optionFinalSelect;
  importarDescargar:boolean;//true descarga, false importacion
  arrayTypeInitialization : any[] = [
    {value:"CLI", label:"CLIENTES" , options: [{label:"ANTICIPOS", code:"ANT_CLIENTE"}, {label:"COBROS", code: "COB_CLIENTE"}]},
    {value:"PRO", label:"PROVEEDORES", options: [{label:"ANTICIPOS", code:"ANT_PROVEEDOR"}, {label:"CREDITOS", code: "CRED_PROVEEDOR"}] },
    {value:"FR", label:"FONDO A RENDIR" },
  ];

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Saldos Iniciales" },
      { label: "Gestión de saldos iniciales", active: true },
    ];
    /* PAra que tenga el valor de clientes de entrada */
    this.selectInicializacion = this.arrayTypeInitialization[0]['value'];
    this.selectypeInitialization(this.arrayTypeInitialization[0]);
   /*Fin para que tenga el valor de clientes de entrada */
  }

  selectypeInitialization(value){
    this.selectLabel = value['label'];
    this.optionListInitialization = value['options'];

    let provisionalFinalOption ="";

    if(this.optionListInitialization == undefined && value['value'] == "FR"){
      provisionalFinalOption = value["value"];
    }
    this.optionFinalSelect = this.optionListInitialization == undefined ? provisionalFinalOption: "" ;
  }

  accionDescargar(){
    this.importarDescargar = true;
  }
  accionImportar(){
    this.importarDescargar = false;
  }
  selectFinalOption(value){
    this.optionFinalSelect = value;
  }
}
