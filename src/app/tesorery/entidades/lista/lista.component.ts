import { Component } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Entidades';
  titulo:string = 'Lista de Entidades';

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    /* this.formato = {
      cabeceras:{
        "acciones" : {"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Acciones","colsize":"12","filtrotipo":"number"},
        "id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"ID","colsize":"12","filtrotipo":"text"},
        "nombre":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Nombre","colsize":"12","filtrotipo":"number"},
        "sigla":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Sigla","colsize":"12","filtrotipo":"text"},
        "descripcion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Descripción","colsize":"12","filtrotipo":"text"},
        "telefono":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Telefono","colsize":"12","filtrotipo":"text"},
        "direccion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Dirección","colsize":"12","filtrotipo":"text"},
        "url":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Url","colsize":"12","filtrotipo":"text"},
        "estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Estado","colsize":"12","filtrotipo":"text"},
      }
    }; */
  }
}
