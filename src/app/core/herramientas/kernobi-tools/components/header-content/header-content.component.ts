import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent {
  @Input() titulo: string = ''
  @Input() btnNuevo = true
  @Output() nuevo: EventEmitter<any> = new EventEmitter()
  @Output() refrescar: EventEmitter<any> = new EventEmitter()

}
