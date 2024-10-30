import { Component } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


export class FuncionesComponent {

  getOpcionesCabecera(texto: string, colsize: number, filtrotipo: string = 'text', visible: boolean = true, sorteable: boolean =true) {
    return {
      "visible": visible,
      "buscable": true,
      "buscableCheck": true,
      "visibleCheck": visible,
      "sortable": sorteable,
      "filtrable": true,
      "texto": texto,
      "colsize": colsize,
      "filtrotipo": filtrotipo
    }
  }
  
 
}
