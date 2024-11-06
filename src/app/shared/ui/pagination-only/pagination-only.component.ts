import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'pagination-only',
  templateUrl: './pagination-only.component.html',
  styleUrls: ['./pagination-only.component.scss']
})
export class PaginationOnlyComponent {
  @Output() alPaginar: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectPageSmall: boolean = false;
  @Input() datos: any[] = [];
  @Input() pagination = {
    size: 10,
    page: 0,
    sortBy: "id",
    descending: false,
    pages: 0,
    limit: 0,
  };

  obtenerDatos(){
    this.alPaginar.emit(this.pagination);
  }

  pageChanged(event: PageChangedEvent) {
    this.pagination.page = event.page;
    this.obtenerDatos();
  }
}
