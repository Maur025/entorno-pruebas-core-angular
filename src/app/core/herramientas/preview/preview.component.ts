import { Component, Input} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'modal-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class ModalPreviewComponent {

  @Input() images: any = {};

  constructor(
    private modalService: BsModalService,
  ){}

  ngOnInit(): void {
    console.log(this.images)
  }

  cerrarModal(){
    this.modalService.hide();
  }

  registrar(){
    this.modalService.setDismissReason("success");
    this.cerrarModal();
  }

}
