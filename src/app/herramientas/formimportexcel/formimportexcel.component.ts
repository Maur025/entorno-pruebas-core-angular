import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apiservicio } from 'src/app/core/services/compras/apiservicio';
import { NotificacionService } from 'src/app/core/services/notificacion.service';

@Component({
  selector: 'form-import-excel',
  templateUrl: './formimportexcel.component.html',
  styleUrls: ['./formimportexcel.component.scss']
})
export class FormularioImportExcelComponent {
  // @Input() data: any = {};
  @Input() datosService: Apiservicio;
  archivoExcel: any;
  archivoForm!: FormGroup;
  submitted = false;
  excelData:any;
  get formArchive() {
    return this.archivoForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    public notif: NotificacionService,
  ) {
  }
  ngOnInit(): void {
    this.archivoForm = this.formBuilder.group({
      archivo: ['', [Validators.required]],
    });
  }
  handleFileInput(e){
    this.archivoExcel = e.addedFiles[0];
  }
  onRemove() {
    this.archivoExcel = null;
  }

  enviarArchivo(){
    this.submitted = true;
    if(this.archivoExcel){
      let archivoData = new FormData();
      archivoData.append("file", this.archivoExcel);
      this.datosService.importar(archivoData)
      .subscribe(
        (data:any) => {
          this.archivoForm.reset();
          this.modalService.hide();
          //this.notif.successStandar();
          this.excelData = data.data;
          if (typeof this.excelData.errors !== undefined )
            if (Array.isArray(this.excelData.errors))
              if (this.excelData.errors.length>0)
                this.notif.alertError(this.excelData.errors[0]);
              else
                this.notif.successStandar();
            else
              this.notif.warningStandar("El archivo contiene errores");
        },
        error => {
          this.notif.alertError(error);
      });
    }
  }

  cerrarModal(){
    this.modalService.hide();
  }

}
